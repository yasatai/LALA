import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { geoContains, geoMercator, geoPath } from 'd3-geo';
import polylabel from 'polylabel';

const municipalitySpecs = [
  ['04213', '栗原市', '県北'], ['04212', '登米市', '県北'], ['04215', '大崎市', '県北'],
  ['04445', '加美町', '県北'], ['04444', '色麻町', '県北'], ['04501', '涌谷町', '県北'],
  ['04505', '美里町', '県北'], ['04205', '気仙沼市', '三陸・石巻'],
  ['04606', '南三陸町', '三陸・石巻'], ['04202', '石巻市', '三陸・石巻'],
  ['04581', '女川町', '三陸・石巻'], ['04214', '東松島市', '三陸・石巻'],
  ['04100', '仙台市', '仙台都市圏'], ['04216', '富谷市', '仙台都市圏'],
  ['04421', '大和町', '仙台都市圏'], ['04422', '大郷町', '仙台都市圏'],
  ['04424', '大衡村', '仙台都市圏'], ['04406', '利府町', '仙台都市圏'],
  ['04203', '塩竈市', '仙台都市圏'], ['04209', '多賀城市', '仙台都市圏'],
  ['04404', '七ヶ浜町', '仙台都市圏'], ['04401', '松島町', '仙台都市圏'],
  ['04207', '名取市', '県南'], ['04211', '岩沼市', '県南'], ['04361', '亘理町', '県南'],
  ['04362', '山元町', '県南'], ['04206', '白石市', '県南'], ['04208', '角田市', '県南'],
  ['04301', '蔵王町', '県南'], ['04302', '七ヶ宿町', '県南'], ['04321', '大河原町', '県南'],
  ['04322', '村田町', '県南'], ['04323', '柴田町', '県南'], ['04324', '川崎町', '県南'],
  ['04341', '丸森町', '県南'],
].map(([code, name, region]) => ({ code, name, region, featured: code === '04100' }));

const MAP_WIDTH = 1086;
const MAP_HEIGHT = 1448;
const MAP_PADDING = 44;
const LABEL_GAP = 37;

const [sourceArg, outputArg = 'public/data/miyagi-municipalities.geojson'] = process.argv.slice(2);

if (!sourceArg) {
  throw new Error('Usage: node tools/build-miyagi-geojson.mjs <N03 GeoJSON> [output]');
}

const sourcePath = resolve(sourceArg);
const outputPath = resolve(outputArg);
const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const byName = new Map(municipalitySpecs.map((item) => [item.name, item]));
const grouped = new Map(municipalitySpecs.map((item) => [item.name, []]));
const sourceCodesByName = new Map(municipalitySpecs.map((item) => [item.name, new Set()]));

const squaredDistanceToSegment = (point, start, end) => {
  let x = start[0];
  let y = start[1];
  let dx = end[0] - x;
  let dy = end[1] - y;

  if (dx !== 0 || dy !== 0) {
    const t = ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = end[0];
      y = end[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }

  dx = point[0] - x;
  dy = point[1] - y;
  return dx * dx + dy * dy;
};

const simplifyLine = (points, tolerance = 0.00015) => {
  if (points.length <= 5) return points;
  const closed = points[0][0] === points.at(-1)[0] && points[0][1] === points.at(-1)[1];
  const sourcePoints = closed ? points.slice(0, -1) : points;
  const keep = new Uint8Array(sourcePoints.length);
  keep[0] = 1;
  keep[sourcePoints.length - 1] = 1;
  const stack = [[0, sourcePoints.length - 1]];
  const squaredTolerance = tolerance * tolerance;

  while (stack.length) {
    const [first, last] = stack.pop();
    let index = -1;
    let maxDistance = squaredTolerance;
    for (let i = first + 1; i < last; i += 1) {
      const distance = squaredDistanceToSegment(sourcePoints[i], sourcePoints[first], sourcePoints[last]);
      if (distance > maxDistance) {
        index = i;
        maxDistance = distance;
      }
    }
    if (index !== -1) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }

  const simplified = sourcePoints.filter((_, index) => keep[index]);
  if (closed && simplified.length < 3) {
    simplified.splice(1, 0, sourcePoints[Math.floor(sourcePoints.length / 2)]);
  }
  if (closed && simplified.length >= 3) simplified.push(simplified[0]);
  return simplified.length >= 4 ? simplified : points;
};

const quantizeRing = (ring) => simplifyLine(ring).map(([longitude, latitude]) => [
  Number(longitude.toFixed(5)),
  Number(latitude.toFixed(5)),
]);

const polygonsFromGeometry = (geometry) => {
  if (geometry.type === 'Polygon') return [geometry.coordinates];
  if (geometry.type === 'MultiPolygon') return geometry.coordinates;
  return [];
};

for (const feature of source.features) {
  if (feature.properties?.N03_001 !== '宮城県') continue;
  const name = feature.properties?.N03_004;
  if (!byName.has(name)) continue;
  sourceCodesByName.get(name).add(feature.properties?.N03_007);
  grouped.get(name).push(...polygonsFromGeometry(feature.geometry));
}

const ringArea = (ring) => Math.abs(ring.reduce((sum, point, index) => {
  const next = ring[(index + 1) % ring.length];
  return sum + point[0] * next[1] - next[0] * point[1];
}, 0) / 2);

const distributeLabels = (items, side) => {
  const top = 56;
  const bottom = MAP_HEIGHT - 56;
  const sorted = [...items].sort((a, b) => a.anchorY - b.anchorY);
  const positions = sorted.map((item, index) => Math.max(item.anchorY, index === 0 ? top : 0));

  for (let index = 1; index < positions.length; index += 1) {
    positions[index] = Math.max(positions[index], positions[index - 1] + LABEL_GAP);
  }
  if (positions.at(-1) > bottom) {
    const overflow = positions.at(-1) - bottom;
    for (let index = 0; index < positions.length; index += 1) positions[index] -= overflow;
  }
  for (let index = positions.length - 2; index >= 0; index -= 1) {
    positions[index] = Math.min(positions[index], positions[index + 1] - LABEL_GAP);
  }
  if (positions[0] < top) {
    const offset = top - positions[0];
    for (let index = 0; index < positions.length; index += 1) positions[index] += offset;
  }

  return sorted.map((item, index) => ({
    ...item,
    labelX: side === 'left' ? 86 : MAP_WIDTH - 86,
    labelY: Number(positions[index].toFixed(2)),
    labelAlign: side === 'left' ? 'start' : 'end',
  }));
};

const features = municipalitySpecs.map((spec) => {
  const polygons = grouped.get(spec.name);
  if (!polygons?.length) throw new Error(`N03 polygon missing: ${spec.name}`);
  const simplifiedPolygons = polygons.map((polygon) => polygon.map(quantizeRing));
  const geometry = { type: 'MultiPolygon', coordinates: simplifiedPolygons };
  const feature = {
    type: 'Feature',
    properties: {
      ...spec,
      sourceCodes: [...sourceCodesByName.get(spec.name)].sort(),
      source: '国土数値情報 行政区域データ N03 2026',
    },
    geometry,
  };

  const polygonsByArea = [...simplifiedPolygons].sort((a, b) => ringArea(b[0]) - ringArea(a[0]));
  let anchor = null;
  for (const polygon of polygonsByArea) {
    const candidate = polylabel(polygon, 0.000001);
    if (geoContains(feature, candidate)) {
      anchor = candidate;
      break;
    }
  }
  if (!anchor) throw new Error(`Interior anchor could not be generated: ${spec.name}`);

  feature.properties.anchorLongitude = Number(anchor[0].toFixed(7));
  feature.properties.anchorLatitude = Number(anchor[1].toFixed(7));
  return feature;
});

const actualNames = new Set(features.map((feature) => feature.properties.name));
const expectedNames = new Set(municipalitySpecs.map((item) => item.name));
const missing = [...expectedNames].filter((name) => !actualNames.has(name));
const unexpected = [...actualNames].filter((name) => !expectedNames.has(name));
const duplicateCodes = municipalitySpecs
  .map((item) => item.code)
  .filter((code, index, codes) => codes.indexOf(code) !== index);
const invalidAnchors = features.filter((feature) => !geoContains(feature, [
  feature.properties.anchorLongitude,
  feature.properties.anchorLatitude,
])).map((feature) => feature.properties.name);
const codeMismatches = features.filter((feature) => {
  const { code, name, sourceCodes } = feature.properties;
  if (name === '仙台市') {
    return sourceCodes.join(',') !== '04101,04102,04103,04104,04105' || code !== '04100';
  }
  return sourceCodes.length !== 1 || sourceCodes[0] !== code;
}).map((feature) => ({
  name: feature.properties.name,
  code: feature.properties.code,
  sourceCodes: feature.properties.sourceCodes,
}));

if (features.length !== 35 || missing.length || unexpected.length || duplicateCodes.length || invalidAnchors.length || codeMismatches.length) {
  throw new Error(JSON.stringify({ count: features.length, missing, unexpected, duplicateCodes, invalidAnchors, codeMismatches }));
}

const output = {
  type: 'FeatureCollection',
  name: 'miyagi-municipalities-2026',
  source: {
    title: '国土数値情報 行政区域データ N03 2026',
    file: 'N03-20260101_04_GML.zip',
    url: 'https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-2026.html',
    generatedAt: new Date().toISOString(),
  },
  features,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(output), 'utf8');

const projection = geoMercator().fitExtent(
  [[MAP_PADDING, MAP_PADDING], [MAP_WIDTH - MAP_PADDING, MAP_HEIGHT - MAP_PADDING]],
  output,
);
const pathGenerator = geoPath(projection).digits(0);
const projected = features.map((feature) => {
  const anchor = projection([
    feature.properties.anchorLongitude,
    feature.properties.anchorLatitude,
  ]);
  if (!anchor) throw new Error(`Projection failed: ${feature.properties.name}`);
  return {
    code: feature.properties.code,
    name: feature.properties.name,
    region: feature.properties.region,
    featured: feature.properties.featured,
    path: pathGenerator(feature) ?? '',
    anchorX: Number(anchor[0].toFixed(2)),
    anchorY: Number(anchor[1].toFixed(2)),
  };
});
const renderItems = [
  ...distributeLabels(projected.filter((item) => item.anchorX < MAP_WIDTH / 2), 'left'),
  ...distributeLabels(projected.filter((item) => item.anchorX >= MAP_WIDTH / 2), 'right'),
].map((item) => ({
  ...item,
  guidePath: `M${item.anchorX},${item.anchorY}L${item.labelX + (item.labelAlign === 'start' ? -12 : 12)},${Number((item.labelY - 5).toFixed(2))}`,
}));
const sendai = renderItems.find((item) => item.code === '04100');
const renderOutputPath = resolve(dirname(outputPath), 'miyagi-map-render-data.json');
const renderOutput = {
  source: output.source,
  viewBox: [0, 0, MAP_WIDTH, MAP_HEIGHT],
  sendaiOrigin: {
    xPercent: Number(((sendai.anchorX / MAP_WIDTH) * 100).toFixed(4)),
    yPercent: Number(((sendai.anchorY / MAP_HEIGHT) * 100).toFixed(4)),
  },
  municipalities: renderItems,
};
await writeFile(renderOutputPath, JSON.stringify(renderOutput), 'utf8');
console.log(JSON.stringify({ outputPath, renderOutputPath, count: features.length, missing, unexpected, duplicateCodes, invalidAnchors, codeMismatches }));

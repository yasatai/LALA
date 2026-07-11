import { useEffect, useState, type CSSProperties } from 'react';
import { municipalities, municipalityRegions, type MunicipalityRegion } from '../../data/municipalities';
import styles from '../../pages/Home.module.css';
import { prepareStoryImages, scheduleIdleTask } from './storyPreparation';

type MunicipalityRenderData = {
  code: string;
  name: string;
  region: MunicipalityRegion;
  featured: boolean;
  path: string;
  anchorX: number;
  anchorY: number;
  labelX: number;
  labelY: number;
  labelAlign: 'start' | 'end';
  guidePath: string;
};

type MiyagiMapRenderData = {
  viewBox: [number, number, number, number];
  sendaiOrigin: {
    xPercent: number;
    yPercent: number;
  };
  municipalities: MunicipalityRenderData[];
};

type MiyagiMunicipalityMapProps = {
  selectedCode: string;
  onSelect: (code: string) => void;
  onReady: () => void;
};

let renderDataRequest: Promise<MiyagiMapRenderData> | null = null;

function loadRenderData() {
  if (!renderDataRequest) {
    renderDataRequest = fetch('/data/miyagi-map-render-data.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Miyagi map render data: ${response.status}`);
        return response.json() as Promise<MiyagiMapRenderData>;
      })
      .then((data) => {
        const knownCodes = new Set(municipalities.map((municipality) => municipality.code));
        const valid = data.municipalities.length === 35
          && data.municipalities.every((municipality) => knownCodes.has(municipality.code));
        if (!valid) throw new Error('Miyagi municipality render data validation failed');
        return data;
      });
  }

  return renderDataRequest;
}

export function MiyagiMunicipalityMap({ selectedCode, onSelect, onReady }: MiyagiMunicipalityMapProps) {
  const [renderData, setRenderData] = useState<MiyagiMapRenderData | null>(null);

  useEffect(() => {
    let active = true;
    let readyNotified = false;
    const notifyReady = () => {
      if (!active || readyNotified) return;
      readyNotified = true;
      onReady();
    };
    const fallbackTimer = window.setTimeout(notifyReady, 2500);
    const cancelIdleTask = scheduleIdleTask(() => {
      void Promise.all([loadRenderData(), prepareStoryImages()])
      .then(([data]) => {
        if (!active) return;
        setRenderData(data);
        window.requestAnimationFrame(notifyReady);
      })
      .catch((error: unknown) => {
        console.error(error);
        notifyReady();
      });
    });

    return () => {
      active = false;
      window.clearTimeout(fallbackTimer);
      cancelIdleTask();
    };
  }, [onReady]);

  const mapStyle = renderData ? ({
    '--sendai-origin-x': `${renderData.sendaiOrigin.xPercent}%`,
    '--sendai-origin-y': `${renderData.sendaiOrigin.yPercent}%`,
  } as CSSProperties) : undefined;
  const selectedMunicipality = renderData?.municipalities.find((item) => item.code === selectedCode);
  const viewBox = renderData?.viewBox ?? [0, 0, 1086, 1448];

  return (
    <>
      <div
        className={`${styles.storyMap} ${styles.mapMotionLayer}`}
        aria-label="宮城県内35市町村の対応エリア"
        style={mapStyle}
      >
        <svg viewBox={viewBox.join(' ')} preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="miyagi-map-title">
          <title id="miyagi-map-title">仙台市を中心とした宮城県全35市町村の対応エリア</title>
          <defs>
            {renderData?.municipalities.map((item) => (
              <path key={`definition-${item.code}`} id={`miyagi-area-${item.code}`} d={item.path} />
            ))}
            {renderData && (
              <clipPath id="miyagi-story-clip">
                {renderData.municipalities.map((item) => (
                  <use key={`clip-${item.code}`} href={`#miyagi-area-${item.code}`} />
                ))}
              </clipPath>
            )}
            <linearGradient id="miyagi-story-shade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f5f0e4" stopOpacity="0.22" />
              <stop offset="1" stopColor="#1e3226" stopOpacity="0.56" />
            </linearGradient>
          </defs>

          {renderData && (
            <>
              <g clipPath="url(#miyagi-story-clip)">
                <rect width="1086" height="1448" fill="#dce4d3" />
                <image
                  className={styles.mapConstructionPhoto}
                  href="/images/service-interior-map.jpg"
                  x="-250"
                  y="0"
                  width="1600"
                  height="1448"
                  preserveAspectRatio="xMidYMid slice"
                />
                <image
                  className={styles.mapStationPhoto}
                  href="/images/sendai-station.jpg"
                  x="-250"
                  y="0"
                  width="1600"
                  height="1448"
                  preserveAspectRatio="xMidYMid slice"
                />
                <rect width="1086" height="1448" fill="url(#miyagi-story-shade)" />
              </g>

              <g className={styles.municipalityAreaLayer}>
                {renderData.municipalities.map((item) => (
                  <use
                    key={`area-${item.code}`}
                    href={`#miyagi-area-${item.code}`}
                    className={`${styles.municipalityArea} ${selectedCode === item.code ? styles.municipalityAreaSelected : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${item.name}を選択`}
                    onClick={() => onSelect(item.code)}
                    onFocus={() => onSelect(item.code)}
                    onPointerEnter={() => onSelect(item.code)}
                  />
                ))}
              </g>

              <g className={styles.municipalityGuideLayer} aria-hidden="true">
                {renderData.municipalities.map((item) => (
                  <path
                    key={`guide-${item.code}`}
                    className={selectedCode === item.code ? styles.municipalityGuideSelected : ''}
                    d={item.guidePath}
                  />
                ))}
              </g>

              {renderData.municipalities.map((item) => {
                const selected = selectedCode === item.code;
                return (
                  <g
                    key={item.code}
                    className={`${styles.storyCity} ${item.featured ? styles.storyCityFeatured : ''} ${selected ? styles.storyCitySelected : ''}`}
                    onClick={() => onSelect(item.code)}
                    onPointerEnter={() => onSelect(item.code)}
                  >
                    {selected && (
                      <>
                        <circle className={styles.cityRipple} cx={item.anchorX} cy={item.anchorY} r="28" />
                        <circle className={styles.cityRipple} cx={item.anchorX} cy={item.anchorY} r="28" style={{ animationDelay: '1s' }} />
                      </>
                    )}
                    <circle className={styles.cityDot} cx={item.anchorX} cy={item.anchorY} r={item.featured ? 9 : 5.5} />
                    <text
                      className={styles.municipalityDesktopLabel}
                      x={item.labelX}
                      y={item.labelY}
                      textAnchor={item.labelAlign}
                    >
                      {item.name}
                    </text>
                  </g>
                );
              })}

              <g className={styles.municipalityMobileSelection} aria-hidden="true">
                <rect x="338" y="1328" width="410" height="72" rx="36" />
                <text x="543" y="1374" textAnchor="middle">
                  {selectedMunicipality?.name ?? '仙台市'}
                </text>
              </g>
            </>
          )}
        </svg>
      </div>

      <nav className={styles.municipalityDirectory} aria-label="宮城県内の対応市町村一覧">
        {municipalityRegions.map((region) => (
          <div key={region}>
            <strong>{region}</strong>
            <p>
              {municipalities.filter((municipality) => municipality.region === region).map((municipality, index, items) => (
                <span key={municipality.code}>
                  <button
                    type="button"
                    className={selectedCode === municipality.code ? styles.municipalityDirectorySelected : ''}
                    onClick={() => onSelect(municipality.code)}
                    onFocus={() => onSelect(municipality.code)}
                    onPointerEnter={() => onSelect(municipality.code)}
                  >
                    {municipality.name}
                  </button>
                  {index < items.length - 1 ? '・' : ''}
                </span>
              ))}
            </p>
          </div>
        ))}
      </nav>
    </>
  );
}

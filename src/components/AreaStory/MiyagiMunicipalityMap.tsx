import { useEffect, useState, type CSSProperties } from 'react';
import { municipalities, municipalityRegions } from '../../data/municipalities';
import { withBase } from '../../lib/basePath';
import styles from '../../pages/Home.module.css';
import {
  getPreparedMiyagiMapData,
  preloadMiyagiMapAssets,
  type MiyagiMapRenderData,
} from './storyPreparation';

type MiyagiMunicipalityMapProps = {
  selectedCode: string;
  onSelect: (code: string) => void;
  onReady: () => void;
};

export function MiyagiMunicipalityMap({ selectedCode, onSelect, onReady }: MiyagiMunicipalityMapProps) {
  const [renderData, setRenderData] = useState<MiyagiMapRenderData | null>(getPreparedMiyagiMapData);

  useEffect(() => {
    if (renderData) return undefined;

    let active = true;
    void preloadMiyagiMapAssets()
      .then((data) => {
        if (!active) return;
        setRenderData(data);
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return () => {
      active = false;
    };
  }, [renderData]);

  useEffect(() => {
    if (!renderData) return undefined;
    const frame = window.requestAnimationFrame(onReady);
    return () => window.cancelAnimationFrame(frame);
  }, [onReady, renderData]);

  const mapStyle = renderData ? ({
    '--sendai-origin-x': `${renderData.sendaiOrigin.xPercent}%`,
    '--sendai-origin-y': `${renderData.sendaiOrigin.yPercent}%`,
  } as CSSProperties) : undefined;
  const viewBox = renderData?.viewBox ?? [0, 0, 1086, 1448];

  return (
    <div className={styles.storyMapLayout}>
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
            <g clipPath="url(#miyagi-story-clip)">
              <rect width="1086" height="1448" fill="#dce4d3" />
              <image
                className={styles.mapConstructionPhoto}
                href={withBase('/images/service-interior-map.webp')}
                x="-250"
                y="0"
                width="1600"
                height="1448"
                preserveAspectRatio="xMidYMid slice"
              />
              <rect width="1086" height="1448" fill="url(#miyagi-story-shade)" />
            </g>
          )}

          <g className={styles.municipalityInteractionLayer}>
            {renderData && (
              <>
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

              </>
            )}
          </g>
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
    </div>
  );
}

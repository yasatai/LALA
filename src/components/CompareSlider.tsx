import { useRef, useState, type PointerEvent } from 'react';
import type { CaseItem } from '../types';
import styles from './Cases.module.css';

export function CompareSlider({ item }: { item: CaseItem }) {
  const [clip, setClip] = useState(50);
  const dragging = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const applyClip = (clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(3, Math.min(97, p));
    setClip(p);
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* not supported */
    }
    applyClip(e.clientX);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) applyClip(e.clientX);
  };

  const onUp = () => {
    dragging.current = false;
  };

  return (
    <div className={styles.card}>
      <div
        ref={frameRef}
        className={styles.frame}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        role="slider"
        aria-label={`${item.label} 施工前後の比較`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clip)}
      >
        <div className={styles.layer} style={{ backgroundImage: `url(${item.before})` }} />
        <div
          className={styles.layer}
          style={{
            backgroundImage: `url(${item.after})`,
            clipPath: `inset(0 ${100 - clip}% 0 0)`,
          }}
        />
        <span className={`${styles.tag} ${styles.tagBefore}`}>施工前</span>
        <span className={`${styles.tag} ${styles.tagAfter}`}>施工後</span>
        <div className={styles.handle} style={{ left: `${clip}%` }} />
        <div className={styles.knob} style={{ left: `${clip}%` }}>
          ‹ ›
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.metaLabel}>{item.label}</span>
        <span className={styles.metaNo}>{item.no}</span>
      </div>
    </div>
  );
}

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import type { homeWorks } from '../../data/lala';
import { withBase, withBaseSrcSet } from '../../lib/basePath';
import styles from '../../pages/Home.module.css';

type WorkItem = (typeof homeWorks)[number];

interface WorkCardProps {
  work: WorkItem;
  motionOrder: number;
  onCompareStart: () => void;
  onCompareEnd: () => void;
}

const clampPosition = (value: number) => Math.min(90, Math.max(10, value));

export function WorkCard({ work, motionOrder, onCompareStart, onCompareEnd }: WorkCardProps) {
  const [position, setPosition] = useState(50);
  const compareRef = useRef<HTMLDivElement>(null);
  const optimizedAfter = work.after.replace(/\.webp$/, '-960.webp');
  const optimizedBefore = work.before.replace(/\.webp$/, '-960.webp');

  const updateFromPointer = (clientX: number) => {
    const bounds = compareRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setPosition(clampPosition(((clientX - bounds.left) / bounds.width) * 100));
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    onCompareStart();
    updateFromPointer(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    updateFromPointer(event.clientX);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPosition((current) => clampPosition(current - step));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setPosition((current) => clampPosition(current + step));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setPosition(10);
    } else if (event.key === 'End') {
      event.preventDefault();
      setPosition(90);
    }
  };

  return (
    <article data-motion-item data-motion-order={motionOrder} className={styles.workCard}>
      <div ref={compareRef} className={styles.workCompare}>
        <img
          src={withBase(work.after)}
          srcSet={withBaseSrcSet(`${optimizedAfter} 960w`)}
          sizes="(max-width: 767px) calc(100vw - 40px), clamp(380px, 32vw, 600px)"
          alt={`${work.title}の施工後`}
          width="720"
          height="480"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <img
          className={styles.workBefore}
          src={withBase(work.before)}
          srcSet={withBaseSrcSet(`${optimizedBefore} 960w`)}
          sizes="(max-width: 767px) calc(100vw - 40px), clamp(380px, 32vw, 600px)"
          alt={`${work.title}の施工前`}
          width="720"
          height="480"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
        <span className={styles.beforeLabel}>Before</span>
        <span className={styles.afterLabel}>After</span>
        <span className={styles.compareLine} style={{ left: `${position}%` }} aria-hidden="true" />
        <button
          type="button"
          className={styles.compareHandle}
          style={{ left: `${position}%` }}
          role="slider"
          aria-label={`${work.title}の施工前後を比較する`}
          aria-valuemin={10}
          aria-valuemax={90}
          aria-valuenow={Math.round(position)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onLostPointerCapture={onCompareEnd}
          onKeyDown={handleKeyDown}
        >
          <span aria-hidden="true">↔</span>
        </button>
      </div>
      <div className={styles.workBody}>
        <h3>{work.title}</h3>
        {(work.area || work.period) && <span>{[work.area, work.period].filter(Boolean).join(' / ')}</span>}
      </div>
    </article>
  );
}

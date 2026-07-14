import { useCallback, useEffect, useRef, type KeyboardEvent } from 'react';
import { homeWorks } from '../../data/lala';
import { WorkCard } from './WorkCard';
import styles from '../../pages/Home.module.css';

export function WorksSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const updateCarousel = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maximum = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const progress = maximum > 0 ? viewport.scrollLeft / maximum : 1;
    progressRef.current?.style.setProperty('--works-progress', `${Math.max(0.08, Math.min(1, progress)) * 100}%`);
    if (previousRef.current) previousRef.current.disabled = maximum <= 1;
    if (nextRef.current) nextRef.current.disabled = maximum <= 1;
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    let animationFrame = 0;
    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateCarousel();
      });
    };
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(viewport);
    const firstCard = viewport.querySelector<HTMLElement>(`.${styles.workCard}`);
    if (firstCard) observer.observe(firstCard);
    viewport.addEventListener('scroll', scheduleUpdate, { passive: true });
    updateCarousel();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      viewport.removeEventListener('scroll', scheduleUpdate);
      observer.disconnect();
    };
  }, [updateCarousel]);

  const moveCarousel = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstCard = viewport?.querySelector<HTMLElement>(`.${styles.workCard}`);
    if (!viewport || !track || !firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = firstCard.getBoundingClientRect().width + gap;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maximum = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const atStart = viewport.scrollLeft <= 1;
    const atEnd = viewport.scrollLeft >= maximum - 1;
    const target = direction < 0 && atStart
      ? maximum
      : direction > 0 && atEnd
        ? 0
        : viewport.scrollLeft + (direction * distance);
    viewport.scrollTo({
      left: target,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const handleViewportKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveCarousel(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveCarousel(1);
    }
  };

  const startComparing = () => viewportRef.current?.classList.add(styles.worksComparing);
  const endComparing = () => viewportRef.current?.classList.remove(styles.worksComparing);

  return (
    <section id="works" data-motion-group="works" className={`${styles.section} ${styles.works}`} aria-labelledby="works-title">
      <div className={styles.worksInner}>
        <header data-motion-item data-motion-order="0" className={styles.worksHeader}>
          <h2 id="works-title">施工イメージ</h2>
          <a className={styles.worksAllLink} href="/works">
            <span>すべての事例を見る</span>
            <b aria-hidden="true">→</b>
          </a>
        </header>

        <div className={styles.worksCarousel}>
          <div
            ref={viewportRef}
            className={styles.worksViewport}
            role="region"
            aria-label="施工イメージカルーセル"
            tabIndex={0}
            onKeyDown={handleViewportKeyDown}
          >
            <div ref={trackRef} className={styles.worksTrack}>
              {homeWorks.map((work, index) => (
                <WorkCard
                  key={work.title}
                  work={work}
                  motionOrder={index + 1}
                  onCompareStart={startComparing}
                  onCompareEnd={endComparing}
                />
              ))}
            </div>
          </div>
        </div>

        <footer data-motion-item data-motion-order={homeWorks.length + 1} className={styles.worksFooter}>
          <div ref={progressRef} className={styles.worksProgress} aria-hidden="true">
            <span />
          </div>
          <div className={styles.worksControls}>
            <button ref={previousRef} type="button" aria-label="前の施工事例を見る" onClick={() => moveCarousel(-1)}>←</button>
            <button ref={nextRef} type="button" aria-label="次の施工事例を見る" onClick={() => moveCarousel(1)}>→</button>
          </div>
        </footer>
      </div>
    </section>
  );
}

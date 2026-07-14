import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../pages/Home.module.css';
import { preloadMiyagiMapAssets } from './storyPreparation';

let areaStoryModuleRequest: Promise<typeof import('./AreaStorySection')> | null = null;
let areaStoryPreparationRequest: Promise<typeof import('./AreaStorySection')> | null = null;

function loadAreaStoryModule() {
  areaStoryModuleRequest ??= import('./AreaStorySection').catch((error: unknown) => {
    areaStoryModuleRequest = null;
    throw error;
  });
  return areaStoryModuleRequest;
}

function prepareAreaStory() {
  if (!areaStoryPreparationRequest) {
    areaStoryPreparationRequest = Promise.all([
      loadAreaStoryModule(),
      preloadMiyagiMapAssets(),
    ])
      .then(([module]) => module)
      .catch((error: unknown) => {
        areaStoryPreparationRequest = null;
        throw error;
      });
  }

  return areaStoryPreparationRequest;
}

const LazyAreaStorySection = lazy(() => prepareAreaStory().then((module) => ({
  default: module.AreaStorySection,
})));

export function DeferredAreaStory() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const loadCommittedRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const commitPreparedAreaStory = useCallback(() => {
    if (loadCommittedRef.current) return;
    loadCommittedRef.current = true;
    setShouldLoad(true);
  }, []);

  useEffect(() => {
    let active = true;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
      return undefined;
    }

    const warmAreaStory = () => {
      if (!active) return;
      void prepareAreaStory().catch(() => undefined);
    };
    const idleWindow = window as Window & typeof globalThis & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(warmAreaStory, { timeout: 3000 });
      return () => {
        active = false;
        idleWindow.cancelIdleCallback?.(handle);
      };
    }

    const handle = window.setTimeout(warmAreaStory, 3000);

    return () => {
      active = false;
      window.clearTimeout(handle);
    };
  }, []);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || shouldLoad) return undefined;
    let active = true;

    const loadPreparedAreaStory = () => {
      void prepareAreaStory()
        .then(() => {
          if (!active) return;
          commitPreparedAreaStory();
        })
        .catch(() => {
          if (!active) return;
          setLoadFailed(true);
        });
    };

    if (!('IntersectionObserver' in window)) {
      setLoadFailed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      loadPreparedAreaStory();
      observer.disconnect();
    }, { rootMargin: '600px 0px' });

    observer.observe(trigger);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [commitPreparedAreaStory, shouldLoad]);

  return (
    <div ref={triggerRef} className={styles.areaStoryDeferred} aria-busy={!shouldLoad && !loadFailed}>
      {loadFailed ? (
        <div className={styles.areaStoryLoading} aria-hidden="true" />
      ) : shouldLoad ? (
        <Suspense fallback={<div className={styles.areaStoryLoading} aria-hidden="true" />}>
          <LazyAreaStorySection />
        </Suspense>
      ) : null}
    </div>
  );
}

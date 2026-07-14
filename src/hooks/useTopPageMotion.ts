import { useLayoutEffect, type RefObject } from 'react';

const groupSelector = '[data-motion-group]';

export function useTopPageMotion(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const groups = Array.from(root.querySelectorAll<HTMLElement>(groupSelector));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;
    let passedObserver: IntersectionObserver | null = null;

    const revealGroup = (group: HTMLElement) => {
      group.dataset.motionVisible = 'true';
      observer?.unobserve(group);
      passedObserver?.unobserve(group);
    };

    const configureMotion = () => {
      observer?.disconnect();
      passedObserver?.disconnect();
      observer = null;
      passedObserver = null;

      if (reducedMotion.matches || !('IntersectionObserver' in window)) {
        delete root.dataset.motionReady;
        return;
      }

      root.dataset.motionReady = 'true';
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) revealGroup(entry.target as HTMLElement);
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10%',
      });

      passedObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) revealGroup(entry.target as HTMLElement);
        });
      }, {
        threshold: 0,
        rootMargin: '10000px 0px -99%',
      });

      groups.forEach((group) => {
        if (group.dataset.motionVisible !== 'true') {
          observer?.observe(group);
          passedObserver?.observe(group);
        }
      });
    };

    const revealFocusedGroup = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const group = target.closest<HTMLElement>(groupSelector);
      if (group && root.contains(group)) revealGroup(group);
    };

    configureMotion();
    reducedMotion.addEventListener('change', configureMotion);
    root.addEventListener('focusin', revealFocusedGroup);

    return () => {
      observer?.disconnect();
      passedObserver?.disconnect();
      reducedMotion.removeEventListener('change', configureMotion);
      root.removeEventListener('focusin', revealFocusedGroup);
      delete root.dataset.motionReady;
    };
  }, [rootRef]);
}

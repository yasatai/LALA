import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element once it scrolls into view. Mirrors the original
 * IntersectionObserver-based reveal (threshold 0.12, bottom margin -8%),
 * with a 2s safety fallback that forces visibility.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              io?.disconnect();
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      io.observe(el);
    } catch {
      setVisible(true);
    }

    const fallback = window.setTimeout(() => setVisible(true), 2000);

    return () => {
      io?.disconnect();
      window.clearTimeout(fallback);
    };
  }, [visible]);

  return { ref, visible };
}

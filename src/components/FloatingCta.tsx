import { useIsDesktop } from '../hooks/useMediaQuery';
import styles from './FloatingCta.module.css';

export function FloatingCta() {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <a href="#contact-link" className={styles.desktop}>
        無料相談はこちら
      </a>
    );
  }

  return (
    <a href="#contact-link" className={styles.mobile}>
      無料相談はこちら
    </a>
  );
}

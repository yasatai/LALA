import { FinalCTA } from '../CTA/FinalCTA';
import styles from '../../pages/Home.module.css';
import { Footer } from './Footer';

interface SiteClosingProps {
  showCta?: boolean;
}

export function SiteClosing({ showCta = false }: SiteClosingProps) {
  return (
    <div className={`${styles.siteClosing} ${showCta ? '' : styles.siteClosingFooterOnly}`}>
      {showCta && <FinalCTA />}
      <Footer />
    </div>
  );
}

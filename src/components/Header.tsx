import { useState } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { navLinks } from '../data/nav';
import { LogoMark } from './Icons';
import styles from './Header.module.css';

export function Header() {
  const isDesktop = useIsDesktop();
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href="#top" className={styles.brand}>
          <LogoMark />
          <span className={styles.brandText}>
            <span className={styles.brandJa}>外壁・屋根塗装ナビ</span>
            <span className={styles.brandEn}>MIYAGI PAINTING NAVI</span>
          </span>
        </a>

        {isDesktop ? (
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
            <a href="#contact-link" className={styles.navCta}>
              無料相談
            </a>
          </nav>
        ) : (
          <button
            type="button"
            className={styles.toggle}
            aria-label="メニューを開く"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>

      {!isDesktop && navOpen && (
        <div className={styles.drawer}>
          <div className={styles.drawerInner}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.drawerLink}
                onClick={closeNav}
              >
                {link.longLabel ?? link.label}
              </a>
            ))}
            <a href="#contact-link" className={styles.drawerCta} onClick={closeNav}>
              無料相談はこちら
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

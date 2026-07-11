import { useEffect, useState } from 'react';
import { company, navigation } from '../../data/lala';
import { MailIcon, PhoneIcon } from '../LalaIcons';
import styles from '../../pages/Home.module.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mobileViewport = window.matchMedia('(max-width: 900px)');
    const shouldLockScroll = open && mobileViewport.matches;

    document.body.style.overflow = shouldLockScroll ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const mobileViewport = window.matchMedia('(max-width: 900px)');
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (!event.matches) setOpen(false);
    };
    const handleWindowResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };

    mobileViewport.addEventListener('change', handleViewportChange);
    window.addEventListener('resize', handleWindowResize);
    return () => {
      mobileViewport.removeEventListener('change', handleViewportChange);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <a className={styles.skip} href="#main">本文へ移動</a>
      <div className={styles.headerInner}>
        <a className={styles.brand} href="/#top" onClick={() => setOpen(false)}>
          <img
            className={styles.headerLogo}
            src="/images/header-logo.png"
            alt="LALA ララ株式会社"
            width="280"
            height="150"
          />
          <span className={styles.brandCopy}>{company.tagline}</span>
        </a>

        <nav className={styles.nav} aria-label="主要ナビゲーション">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <a className={styles.phone} href={`tel:${company.phone.replaceAll('-', '')}`}>
            <span><PhoneIcon /> {company.phone}</span>
            <small>{company.hours}</small>
          </a>
          <a className={styles.headerCta} href="/contact">
            <span><MailIcon /> まずは無料で相談する</span>
          </a>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="メニューを開閉する"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`${styles.mobileDrawer} ${open ? styles.mobileDrawerOpen : ''}`}>
        <nav aria-label="スマートフォン用ナビゲーション">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className={styles.drawerCta} href="/contact" onClick={() => setOpen(false)}>
          まずは無料で相談する
        </a>
      </div>
    </header>
  );
}

import { useEffect, useRef, useState } from 'react';
import { company, navigation } from '../../data/lala';
import { withBase } from '../../lib/basePath';
import { MailIcon, PhoneIcon } from '../LalaIcons';
import styles from '../../pages/Home.module.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const scrollSentinelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sentinel = scrollSentinelRef.current;
    if (!sentinel || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry?.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
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

  useEffect(() => {
    if (!open || !drawerRef.current) return undefined;

    const drawer = drawerRef.current;
    const focusable = Array.from(drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const first = focusable[0];
    const last = focusable.at(-1);
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab' || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      <span ref={scrollSentinelRef} className={styles.headerScrollSentinel} aria-hidden="true" />
      <header data-top-header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <a className={styles.skip} href="#main">本文へ移動</a>
      <div className={styles.headerInner}>
        <a className={styles.brand} href={withBase('/#top')} onClick={() => setOpen(false)}>
          <img
            className={styles.headerLogo}
            src={withBase('/images/header-logo.png')}
            alt="LALA ララ株式会社"
            width="280"
            height="150"
            loading="eager"
            decoding="async"
          />
          <span className={styles.brandCopy}>{company.tagline}</span>
        </a>

        <nav className={styles.nav} aria-label="主要ナビゲーション">
          {navigation.map((item) => (
            <a key={item.href} href={withBase(item.href)}>{item.label}</a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <a className={styles.phone} href={`tel:${company.phone.replaceAll('-', '')}`}>
            <span><PhoneIcon /> {company.phone}</span>
            <small>{company.hours}</small>
          </a>
          <a className={styles.headerCta} href={withBase('/contact')}>
            <span><MailIcon /> まずは無料で相談する</span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        ref={drawerRef}
        id="mobile-navigation"
        className={`${styles.mobileDrawer} ${open ? styles.mobileDrawerOpen : ''}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="スマートフォン用ナビゲーション">
          {navigation.map((item) => (
            <a key={item.href} href={withBase(item.href)} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className={styles.drawerCta} href={withBase('/contact')} onClick={() => setOpen(false)}>
          まずは無料で相談する
        </a>
      </div>
      </header>
    </>
  );
}

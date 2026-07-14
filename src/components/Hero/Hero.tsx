import { useEffect, useState } from 'react';
import { company } from '../../data/lala';
import { withBase } from '../../lib/basePath';
import { MailIcon, MapPinIcon, PhoneIcon } from '../LalaIcons';
import { Arrow } from '../LalaPrimitives';
import styles from '../../pages/Home.module.css';

const heroSlides = [
  {
    src: '/images/hero-renovated-living-v2.webp',
    alt: '木製天井と大開口サッシから庭につながるリフォーム後のリビング',
    width: 1680,
    height: 945,
  },
  {
    src: '/images/hero-living-slide-2.webp',
    alt: '木の梁と明るいキッチンがつながるリフォーム後のリビング',
    width: 1680,
    height: 941,
  },
  {
    src: '/images/hero-living-slide-3.webp',
    alt: '和室とダイニングが一体になったリフォーム後のリビング',
    width: 1536,
    height: 1024,
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [secondarySlidesReady, setSecondarySlidesReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setSecondarySlidesReady(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!secondarySlidesReady || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [secondarySlidesReady]);

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.heroTexture} />
      <div className={styles.heroPlaster} aria-hidden="true" />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span data-hero-motion="badge" className={styles.areaBadge}><MapPinIcon /> 宮城・仙台地域密着</span>
          <h1 data-hero-motion="title">
            <span>リフォームなら</span>
            <span>診断から施工まで</span>
            <span>自社対応のララ株式会社</span>
          </h1>
          <div data-hero-motion="actions" className={styles.heroCtas}>
            <a className={styles.primaryCta} href={withBase('/contact')}><MailIcon /> まずは無料で相談する <Arrow /></a>
            <a className={styles.secondaryCta} href={`tel:${company.phone.replaceAll('-', '')}`}>
              <span><PhoneIcon /> お電話で相談する</span>
              <strong>{company.phone}</strong>
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          {heroSlides.map((slide, index) => (
            (index === 0 || secondarySlidesReady) && (
              <img
                key={slide.src}
                className={`${styles.heroSlide} ${index === activeSlide ? styles.heroSlideActive : ''}`}
                src={withBase(slide.src)}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'low'}
                aria-hidden={index !== activeSlide}
              />
            )
          ))}
        </div>
      </div>
      <div className={styles.heroBottomWave} aria-hidden="true" />
    </section>
  );
}

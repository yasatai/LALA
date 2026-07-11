import { useEffect, useState } from 'react';
import { company } from '../../data/lala';
import { MailIcon, MapPinIcon, PhoneIcon } from '../LalaIcons';
import { Arrow } from '../LalaPrimitives';
import styles from '../../pages/Home.module.css';

const heroSlides = [
  {
    src: '/images/hero-renovated-living-v2.png',
    alt: '木製天井と大開口サッシから庭につながるリフォーム後のリビング',
    width: 1680,
    height: 945,
  },
  {
    src: '/images/hero-living-slide-2.png',
    alt: '木の梁と明るいキッチンがつながるリフォーム後のリビング',
    width: 1680,
    height: 941,
  },
  {
    src: '/images/hero-living-slide-3.png',
    alt: '和室とダイニングが一体になったリフォーム後のリビング',
    width: 1536,
    height: 1024,
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.heroTexture} />
      <div className={styles.heroTopWave} aria-hidden="true" />
      <div className={styles.heroPlaster} aria-hidden="true" />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.areaBadge}><MapPinIcon /> 宮城・仙台地域密着</span>
          <h1>
            <span>リフォームなら</span>
            <span>診断から施工まで</span>
            <span>自社対応のララ株式会社</span>
          </h1>
          <div className={styles.heroCtas}>
            <a className={styles.primaryCta} href="/contact"><MailIcon /> まずは無料で相談する <Arrow /></a>
            <a className={styles.secondaryCta} href={`tel:${company.phone.replaceAll('-', '')}`}>
              <span><PhoneIcon /> お電話で相談する</span>
              <strong>{company.phone}</strong>
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          {heroSlides.map((slide, index) => (
            <img
              key={slide.src}
              className={`${styles.heroSlide} ${index === activeSlide ? styles.heroSlideActive : ''}`}
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              loading="eager"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              aria-hidden={index !== activeSlide}
            />
          ))}
        </div>
      </div>
      <div className={styles.heroBottomWave} aria-hidden="true" />
    </section>
  );
}

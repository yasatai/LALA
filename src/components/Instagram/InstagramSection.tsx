import { Arrow } from '../LalaPrimitives';
import styles from '../../pages/Home.module.css';

const instagramImages = [
  '/images/renovation-hero-living.png',
  '/images/renovation-exterior-roof.png',
  '/images/renovation-bath-wash.png',
  '/images/renovation-kitchen-ldk.png',
  '/images/renovation-entrance.png',
  '/images/renovation-garden.png',
];

export function InstagramSection() {
  return (
    <section id="instagram" className={styles.instagram} aria-labelledby="instagram-title">
      <div className={styles.instagramHead}>
        <span className={styles.instagramMark} aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.25" />
            <circle className={styles.instagramMarkDot} cx="17.35" cy="6.75" r="1.15" />
          </svg>
        </span>
        <div><small>施工例を更新中</small><h2 id="instagram-title">Instagram</h2></div>
      </div>
      <div className={styles.instagramGrid}>
        {instagramImages.map((image, index) => (
          <a
            key={`${image}-${index}`}
            href="https://www.instagram.com/lalareform/"
            target="_blank"
            rel="noreferrer"
            aria-label={`Instagramで施工例${index + 1}を見る`}
          >
            <img src={image} alt="Instagram投稿用の施工写真" width="360" height="360" loading="lazy" />
          </a>
        ))}
      </div>
      <a
        className={styles.instagramFollow}
        href="https://www.instagram.com/lalareform/"
        target="_blank"
        rel="noreferrer"
      >
        フォローする <Arrow />
      </a>
    </section>
  );
}

import styles from './Hero.module.css';

const stats = [
  { num: '宮城', label: '地域密着の優良業者' },
  { num: '無料', label: '一括見積もり' },
  { num: '複数社', label: '同一基準で比較' },
];

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={`${styles.ring} ${styles.ring1}`} />
      <div className={`${styles.ring} ${styles.ring2}`} />
      <div className={`${styles.ring} ${styles.ring3}`} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>RELIABLE PAINTING PARTNER</div>
          <h1 className={styles.title}>
            確かな業者を、複数<em>比較</em>して
            <br />
            選ぶという安心を。
          </h1>
          <p className={styles.lead}>
            様々な業者の中から、あなたの要望に合わせて業者を複数比較・検討します。地元宮城で評判の塗装業者だけをご紹介する、無料一括見積もり比較サービスです。
          </p>
          <div className={styles.scrollCue}>
            <a href="#service-link">
              <span>サービスを見る</span> ↓
            </a>
          </div>
        </div>

        <div className={styles.stats}>
          {stats.map((s) => (
            <div key={s.num} className={styles.stat}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

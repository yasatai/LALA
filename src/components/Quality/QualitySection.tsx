import { qualities } from '../../data/lala';
import styles from '../../pages/Home.module.css';

export function QualitySection() {
  return (
    <section className={`${styles.section} ${styles.quality}`} aria-labelledby="quality-title">
      <div className={styles.qualityIntro}>
        <span className={styles.kicker}>QUALITY</span>
        <h2 id="quality-title">見えないところまで、<br />きちんと整える。</h2>
        <p>保証・素材・現場管理をひとつの流れで考え、長く心地よく暮らせる住まいへ導きます。</p>
      </div>
      <div className={styles.qualityList}>
        {qualities.map(([number, title, text]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className={styles.materials} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

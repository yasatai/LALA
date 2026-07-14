import { promises } from '../../data/lala';
import { withBase } from '../../lib/basePath';
import styles from '../../pages/Home.module.css';

const promiseIcons = ['♧', '♢', '♡'];

export function PromiseSection() {
  return (
    <section data-motion-group="promise" className={`${styles.section} ${styles.promiseSection}`} aria-labelledby="promise-title">
      <div className={styles.promise}>
      <div data-motion-item data-motion-order="0" className={styles.promiseIntro}>
        <h2 id="promise-title">
          <span className={styles.promiseTitleEn}>LALA</span>
          <span className={styles.promiseTitleMain}>3つの約束</span>
        </h2>
      </div>
      <div className={styles.promiseList}>
        {promises.map((item, index) => (
          <article data-motion-item data-motion-order={index + 1} key={item.number}>
            <span aria-hidden="true">{promiseIcons[index]}</span>
            <div>
              <h3>{item.title}</h3>
              <p>
                {item.descriptionLines.map((line) => (
                  <span className={styles.promiseDescriptionLine} key={line}>{line}</span>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
      <aside data-motion-item data-motion-order="4" className={styles.promiseSponsor} aria-label="ベガルタ仙台">
        <img
          src={withBase('/images/vegalta-sendai-transparent.png')}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          alt="ベガルタ仙台"
          width="296"
          height="74"
        />
        <p>
          <span>ベガルタ仙台</span>
          <strong>オフィシャルスポンサー</strong>
        </p>
      </aside>
      </div>
    </section>
  );
}

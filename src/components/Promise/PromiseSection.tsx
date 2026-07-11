import { promises } from '../../data/lala';
import styles from '../../pages/Home.module.css';

const promiseIcons = ['♧', '♢', '♡'];

export function PromiseSection() {
  return (
    <section className={`${styles.section} ${styles.promiseSection}`} aria-labelledby="promise-title">
      <div className={styles.promise}>
      <div className={styles.promiseIntro}>
        <h2 id="promise-title">
          <span className={styles.promiseTitleEn}>LALA</span>
          <span className={styles.promiseTitleMain}>3つの約束</span>
        </h2>
      </div>
      <div className={styles.promiseList}>
        {promises.map((item, index) => (
          <article key={item.number}>
            <span aria-hidden="true">{promiseIcons[index]}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
      <aside className={styles.promiseSponsor} aria-label="ベガルタ仙台">
        <img
          src="/images/vegalta-sendai-transparent.png"
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

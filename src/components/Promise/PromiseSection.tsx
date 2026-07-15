import { promises } from '../../data/lala';
import { withBase } from '../../lib/basePath';
import { gluePhrases } from '../../lib/jaText';
import styles from '../../pages/Home.module.css';

const promiseIcons = ['♧', '♢', '♡'];

// 見出しの改行位置を語句単位に制御する（語句の途中で折り返さない）
const titlePhrases: Record<string, string[]> = {
  '丁寧なヒアリング': ['丁寧な', 'ヒアリング'],
  '確かな品質と施工': ['確かな', '品質と施工'],
  'ずっと安心のサポート': ['ずっと安心の', 'サポート'],
};

// 説明文が折り返す幅でも文節単位で改行させる
const linePhrases: Record<string, string[]> = {
  'ご家族の想いや暮らし方を丁寧に伺い': ['ご家族の', '想いや', '暮らし方を', '丁寧に伺い'],
  '最適なプランをご提案します。': ['最適なプランを', 'ご提案します。'],
  '経験豊富な職人が細かな部分まで': ['経験豊富な', '職人が', '細かな部分まで'],
  '品質を確かめて施工します。': ['品質を確かめて', '施工します。'],
  '工事後も安心して暮らせるよう': ['工事後も', '安心して', '暮らせるよう'],
  '点検と相談体制を続けます。': ['点検と', '相談体制を', '続けます。'],
};

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
              <h3>{gluePhrases(...(titlePhrases[item.title] ?? [item.title]))}</h3>
              <p>
                {item.descriptionLines.map((line) => (
                  <span className={styles.promiseDescriptionLine} key={line}>{gluePhrases(...(linePhrases[line] ?? [line]))}</span>
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

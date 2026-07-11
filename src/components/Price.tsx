import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import styles from './Price.module.css';

const estimateRows = [
  { label: '外壁塗装', value: '80〜120万円', highlight: false },
  { label: '屋根塗装', value: '30〜60万円', highlight: false },
  { label: '外壁＋屋根', value: '100〜160万円', highlight: true },
];

const paintRows = [
  { type: 'ウレタン', years: '6〜8年', price: '安い' },
  { type: 'シリコン', years: '10〜13年', price: '標準' },
  { type: 'フッ素', years: '15〜20年', price: 'やや高い' },
  { type: '無機', years: '20年', price: '高い' },
];

export function Price() {
  return (
    <section id="meyasu-link" className="section shell">
      <SectionHeading eyebrow="PRICE" title="塗装費用の目安" />
      <Reveal delay className={styles.wrap}>
        <div className={styles.callout}>
          <h3 className={styles.calloutTitle}>知らないと数十万円損することもある塗装工事</h3>
          <p className={styles.calloutBody}>
            全塗装工事の相場は100〜160万円と言われています。しかし建物の大きさ・塗料・工事内容によって費用は大きく変わります。まずは一般的な費用の目安を知り、適正な工事価格の参考にしてください。
          </p>
        </div>

        <div className={styles.cols}>
          <div>
            <h4 className={styles.colTitle}>
              <span className={styles.dot} />
              30坪住宅の目安
            </h4>
            <table className={styles.table}>
              <tbody>
                {estimateRows.map((r) => (
                  <tr key={r.label} className={r.highlight ? styles.rowHighlight : undefined}>
                    <td className={styles.label}>{r.label}</td>
                    <td className={styles.value}>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h4 className={styles.colTitle}>
              <span className={styles.dot} />
              塗料の種類
            </h4>
            <table className={styles.paintTable}>
              <thead>
                <tr>
                  <th className={styles.thType}>種類</th>
                  <th className={styles.thYears}>耐久年数</th>
                  <th className={styles.thPrice}>価格帯</th>
                </tr>
              </thead>
              <tbody>
                {paintRows.map((r) => (
                  <tr key={r.type}>
                    <td className={styles.tdType}>{r.type}</td>
                    <td className={styles.tdYears}>{r.years}</td>
                    <td className={styles.tdPrice}>{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className={styles.note}>建物の状態やご予算に合わせて最適な塗料をご提案します。</p>
      </Reveal>
    </section>
  );
}

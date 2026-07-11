import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { IconAward, IconLocation, IconPhoto } from './Icons';
import styles from './Reasons.module.css';

const reasons = [
  {
    no: '01',
    icon: <IconAward />,
    title: '実績',
    body: '紹介実績が、信頼の証。地域の住宅事情を理解したうえで適切な業者選定と比較サポートを実施。“納得して選ばれた結果”が実績につながっています。',
  },
  {
    no: '02',
    icon: <IconLocation />,
    title: '地域密着',
    body: '顔の見える距離感。地域特有の劣化を熟知した“宮城県のみ”に営業所がある優良業者をご紹介。施工後も続く関係を大切にしています。',
  },
  {
    no: '03',
    icon: <IconPhoto />,
    title: '施工事例',
    body: '写真だけでなく内容まで公開。施工前の劣化状況・選定した塗料の理由・施工工程・お客様の声まで、工事の透明性を大切にしています。',
  },
];

export function Reasons() {
  return (
    <section id="riyuu-link" className={styles.section}>
      <div className="section shell">
        <SectionHeading eyebrow="REASONS" title="選ばれる理由" />
        <Reveal delay className={styles.grid}>
          {reasons.map((r) => (
            <div key={r.no} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconCircle}>{r.icon}</div>
                <span className={styles.num}>{r.no}</span>
              </div>
              <h3 className={styles.title}>{r.title}</h3>
              <div className={styles.rule} />
              <p className={styles.body}>{r.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

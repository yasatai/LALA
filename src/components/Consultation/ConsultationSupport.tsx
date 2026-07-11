import styles from '../../pages/Home.module.css';

const assurances = [
  { title: '相談・見積り無料', text: 'まずは話を聞くだけでも大丈夫です。' },
  { title: '無理な営業なし', text: '必要のない工事を強くすすめることはありません。' },
  { title: '小さな修繕も歓迎', text: '外壁・屋根・水まわりなど、気になることからご相談ください。' },
];

const consultationSteps = [
  { title: 'ご相談', text: '住まいのお困りごとを、お気軽にお聞かせください。' },
  { title: '現地確認', text: '必要に応じて現地を確認し、状態を丁寧に確認します。' },
  { title: 'お見積り', text: '内容と費用を分かりやすくご説明します。お見積りは無料です。' },
  { title: 'ご納得後に施工', text: '内容にご納得いただいてから、施工へ進みます。' },
];

export function ConsultationSupport() {
  return (
    <section className={styles.consultationSupport} aria-labelledby="consultation-support-title">
      <div className={styles.consultationIntro}>
        <span>Free Consultation</span>
        <h2 id="consultation-support-title">まずは相談だけでも<br />大丈夫です</h2>
        <div>
          <p>ご相談・お見積りは無料です。</p>
          <p>無理な営業はせず、住まいの状態に合わせて必要なことだけをご案内します。</p>
        </div>
      </div>

      <div className={styles.assuranceBlock}>
        <h3>お問い合わせ前のご不安に</h3>
        <ol className={styles.assuranceList}>
          {assurances.map((item, index) => (
            <li key={item.title}>
              <span>{index + 1}</span>
              <div><h4>{item.title}</h4><p>{item.text}</p></div>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.consultationFlowBlock}>
        <div className={styles.consultationFlowHead}>
          <span>Process</span>
          <h3>ご相談から施工まで</h3>
        </div>
        <ol className={styles.consultationFlowList}>
          {consultationSteps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

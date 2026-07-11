import { flow } from '../../data/lala';
import styles from '../../pages/Home.module.css';

export function ConsultationFlow() {
  return (
    <section id="flow" className={`${styles.section} ${styles.flow}`} aria-labelledby="flow-title">
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.kicker}>FLOW</span>
          <h2 id="flow-title">初めての方も、<br />安心してご相談ください</h2>
        </div>
      </div>
      <ol className={styles.flowList}>
        {flow.map((item, index) => (
          <li key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

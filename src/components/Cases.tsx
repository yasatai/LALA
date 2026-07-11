import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { CompareSlider } from './CompareSlider';
import { cases } from '../data/cases';
import styles from './Cases.module.css';

export function Cases() {
  return (
    <section id="sekou-link" className="section shell">
      <SectionHeading
        eyebrow="WORKS"
        title="施工事例"
        note="中央のハンドルを左右にドラッグして、施工前後を比較できます"
      />
      <Reveal delay className={styles.grid}>
        {cases.map((c) => (
          <CompareSlider key={c.no} item={c} />
        ))}
      </Reveal>
    </section>
  );
}

import { useState } from 'react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { faqItems } from '../data/faq';
import styles from './Faq.module.css';

export function Faq() {
  // -1 = all closed; first item open by default
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i: number) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section id="faq-link" className={`section shell ${styles.section}`}>
      <SectionHeading eyebrow="FAQ" title="よくある質問" />
      <Reveal delay className={styles.list}>
        {faqItems.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q} className={styles.item}>
              <button
                type="button"
                className={styles.row}
                aria-expanded={open}
                onClick={() => toggle(i)}
              >
                <span className={styles.question}>
                  <span className={styles.qMark}>Q</span>
                  {item.q}
                </span>
                <span className={styles.sign}>{open ? '−' : '＋'}</span>
              </button>
              <div className={`${styles.answer} ${open ? styles.open : ''}`}>
                <div className={styles.answerInner}>
                  <span className={styles.aMark}>A</span>
                  <span>{item.a}</span>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}

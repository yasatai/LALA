import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { IconQuote } from './Icons';
import { testimonials } from '../data/testimonials';
import styles from './Voice.module.css';

export function Voice() {
  return (
    <section id="koe-link" className={styles.section}>
      <div className={styles.ring} />
      <div className={`section shell ${styles.inner}`}>
        <SectionHeading eyebrow="VOICE" title="お客様の声" dark />
        <Reveal delay className={styles.grid}>
          {testimonials.map((t) => (
            <div key={t.title} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.avatar}>
                  <IconQuote />
                </div>
                <span className={styles.tag}>{t.tag}</span>
              </div>
              <h3 className={styles.title}>{t.title}</h3>
              <div className={styles.meta}>{t.meta}</div>
              <p className={styles.body}>{t.body}</p>
              <div className={styles.footer}>
                <span>
                  施工：<b>{t.work}</b>
                </span>
                <span>
                  比較：<b>{t.compared}</b>
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

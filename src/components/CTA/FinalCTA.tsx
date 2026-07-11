import { company } from '../../data/lala';
import { Arrow } from '../LalaPrimitives';
import styles from '../../pages/Home.module.css';

export function FinalCTA() {
  return (
    <section className={styles.finalCta} aria-labelledby="final-cta-title">
      <div>
        <h2 id="final-cta-title">小さな修繕から大規模リフォームまで。<br />住まいのことなら、何でもご相談ください。</h2>
      </div>
      <a className={styles.primaryCta} href="/contact"><span aria-hidden="true">✉</span> まずは無料で相談する <Arrow /></a>
      <div className={styles.ctaPhone}>
        <a href={`tel:${company.phone.replaceAll('-', '')}`}>☎ {company.phone}</a>
        <small>{company.hours}</small>
      </div>
    </section>
  );
}

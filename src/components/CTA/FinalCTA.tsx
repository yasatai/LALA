import { company } from '../../data/lala';
import { withBase } from '../../lib/basePath';
import { JaSentences } from '../../lib/jaText';
import { Arrow } from '../LalaPrimitives';
import styles from '../../pages/Home.module.css';

export function FinalCTA() {
  return (
    <section data-motion-group="final-cta" className={styles.finalCta} aria-labelledby="final-cta-title">
      <div data-motion-item data-motion-order="0" className={styles.finalCtaIntro}>
        <span className={styles.finalCtaEyebrow}>住まいのお困りごと</span>
        <h2 id="final-cta-title">まずは無料でご相談ください</h2>
        <p>
          <JaSentences text="小さな修繕から大規模リフォームまで。お見積もり・ご相談は無料です。地域密着で、お客様の暮らしに合わせたご提案をいたします。" />
        </p>
      </div>
      <div data-motion-item data-motion-order="1" className={styles.finalCtaContact}>
        <a className={styles.primaryCta} href={withBase('/contact')}><span aria-hidden="true">✉</span> お問い合わせフォームへ <Arrow /></a>
        <div className={styles.ctaPhone}>
          <span>お電話でのご相談</span>
          <a href={`tel:${company.phone.replaceAll('-', '')}`}>{company.phone}</a>
        </div>
      </div>
      <ul data-motion-item data-motion-order="2" className={styles.finalCtaBenefits} aria-label="LALAの3つの強み">
        <li>ご相談・お見積もり無料</li>
        <li>安心の自社施工</li>
        <li>地域密着迅速対応</li>
      </ul>
    </section>
  );
}

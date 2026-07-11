import { Arrow } from '../LalaPrimitives';
import styles from '../../pages/Home.module.css';

export function AboutSection() {
  return (
    <section id="about" className={`${styles.section} ${styles.about}`} aria-labelledby="about-title">
      <div className={styles.aboutImages}>
        <img
          className={styles.aboutMain}
          src="/images/renovation-kitchen-ldk.png"
          alt="キッチンとLDKを改修した住まい"
          width="1200"
          height="840"
        />
        <img
          className={styles.aboutSub}
          src="/images/renovation-bath-wash.png"
          alt="浴室と洗面を改修した水まわり"
          width="900"
          height="640"
        />
      </div>
      <div className={styles.aboutText}>
        <span className={styles.kicker}>ABOUT LALA</span>
        <h2 id="about-title">地域に根ざした、<br />住まいの相談役</h2>
        <p>
          ララリフォームは、宮城・仙台を中心に、住まいのお悩みに寄り添う地域密着のリフォーム会社です。
        </p>
        <p>
          小さな修繕から大規模リフォームまで、自社施工・自社管理による確かな品質でお応えします。
        </p>
        <a className={styles.textLink} href="/company">会社概要を見る <Arrow /></a>
      </div>
    </section>
  );
}

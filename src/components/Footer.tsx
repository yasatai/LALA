import { LogoMarkLight } from './Icons';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brand}>
            <LogoMarkLight />
            <span className={styles.brandText}>
              <span className={styles.brandJa}>外壁・屋根塗装ナビ</span>
              <span className={styles.brandEn}>MIYAGI PAINTING NAVI</span>
            </span>
          </div>
          <div className={styles.address}>
            <div className={styles.company}>株式会社FIND</div>
            〒980-0803
            <br />
            仙台市青葉区国分町 3-6-11
            <br />
            アーク仙台ビル3F
            <br />
            <a href="tel:0223954355" className={styles.tel}>
              TEL 022-395-4355
            </a>
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>MENU</div>
          <div className={styles.links}>
            <a href="#service-link">サービス紹介</a>
            <a href="#riyuu-link">選ばれる理由</a>
            <a href="#sekou-link">施工事例</a>
            <a href="#koe-link">お客様の声</a>
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>&nbsp;</div>
          <div className={styles.links}>
            <a href="#meyasu-link">塗装費用の目安</a>
            <a href="#faq-link">よくある質問</a>
            <a href="#contact-link" className={styles.accent}>
              無料相談
            </a>
          </div>
        </div>
      </div>

      <div className={styles.copy}>© 外壁・屋根塗装ナビ All Rights Reserved.</div>
    </footer>
  );
}

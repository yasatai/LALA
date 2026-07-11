import { company } from '../../data/lala';
import styles from '../../pages/Home.module.css';

const footerLinks = [
  { label: '施工イメージ', href: '/works' },
  { label: 'サービスメニュー', href: '/services' },
  { label: '会社概要', href: '/company' },
  { label: 'お客様の声', href: '/voices' },
  { label: 'プライバシーポリシー', href: '/privacy-policy' },
];

export function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.footerBrand}>
        <img
          className={styles.footerLogo}
          src="/images/footer-logo.png"
          alt="LALA ララ株式会社"
          width="280"
          height="148"
        />
        <p>{company.tagline}</p>
      </div>
      <nav aria-label="フッターナビゲーション">
        {footerLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
      </nav>
      <address>
        {company.address}<br />
        <small>© 2024 LALA Co., Ltd.</small>
      </address>
      <img
        className={styles.footerMascot}
        src="/images/mascot.png"
        alt="LALAマスコットキャラクター Lala君"
        width="553"
        height="541"
        loading="lazy"
        decoding="async"
      />
      <div className={styles.footerBottom}>
        <a href="#top" aria-label="ページトップへ戻る">↑</a>
      </div>
    </footer>
  );
}

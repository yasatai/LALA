import { withBase, withBaseSrcSet } from '../../lib/basePath';
import { gluePhrases } from '../../lib/jaText';
import styles from '../../pages/Home.module.css';

const serviceLinks = [
  { label: '外壁塗装', href: '/services' },
  { label: '屋根工事', href: '/services' },
  { label: '内装リフォーム', href: '/services' },
  { label: '水まわりリフォーム', href: '/services' },
  { label: '外構工事', href: '/services' },
  { label: '解体・足場', href: '/services' },
];

const companyLinks = [
  { label: '会社概要', href: '/company' },
  { label: '施工事例', href: '/works' },
  { label: 'お客様の声', href: '/voices' },
  { label: 'お問い合わせ', href: '/contact' },
  { label: 'プライバシーポリシー', href: '/privacy-policy' },
];

export function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.footerBrand}>
        <img
          className={styles.footerLogo}
          src={withBase('/images/header-logo.png')}
          loading="lazy"
          decoding="async"
          alt="LALA ララ株式会社"
          width="280"
          height="148"
        />
        <p>{gluePhrases('宮城県を中心に、', '住まいの', 'リフォーム・')}<br />{gluePhrases('外装工事・', '修繕を行う', '地域密着の')}<br />{gluePhrases('リフォーム', '会社です。')}</p>
      </div>
      <section className={styles.footerColumn} aria-labelledby="footer-services-title">
        <h2 id="footer-services-title">サービス</h2>
        <nav aria-label="サービス一覧">
          {serviceLinks.map((link) => <a key={link.label} href={withBase(link.href)}>{link.label}</a>)}
        </nav>
      </section>
      <section className={styles.footerColumn} aria-labelledby="footer-company-title">
        <h2 id="footer-company-title">会社情報</h2>
        <nav aria-label="会社情報一覧">
          {companyLinks.map((link) => <a key={link.label} href={withBase(link.href)}>{link.label}</a>)}
        </nav>
      </section>
      <section className={styles.footerBusiness} aria-labelledby="footer-business-title">
        <h2 id="footer-business-title">営業情報</h2>
        <dl>
          <div><dt>営業時間</dt><dd>9:00〜17:00</dd></div>
          <div><dt>対応エリア</dt><dd>宮城県全域</dd></div>
          <div><dt>所在地</dt><dd>{gluePhrases('宮城県仙台市太白区', '長町南4丁目12-16')}</dd></div>
        </dl>
      </section>
      <img
        className={styles.footerMascot}
        src={withBase('/images/mascot.png')}
        srcSet={withBaseSrcSet('/images/mascot-240.webp 240w')}
        sizes="120px"
        loading="lazy"
        decoding="async"
        alt="LALAマスコットキャラクター Lala君"
        width="553"
        height="541"
      />
        <small className={styles.footerCopyright}>© 2026 LALA Co.,Ltd. All Rights Reserved.</small>
    </footer>
  );
}

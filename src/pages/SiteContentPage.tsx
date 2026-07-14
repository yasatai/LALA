import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb';
import { SiteClosing } from '../components/Footer/SiteClosing';
import { Header } from '../components/Header/Header';
import { serviceDetails, voiceStories, works } from '../data/lala';
import { useSeo } from '../seo/seo';
import styles from './SiteContentPage.module.css';

export type SitePageKey = 'works' | 'services' | 'company' | 'voices' | 'blog';

type PageMeta = { label: string; title: string; description: string; seoDescription: string; path: string };

const pageMeta: Record<SitePageKey, PageMeta> = {
  works: {
    label: 'Works',
    title: '施工イメージ',
    description: '住まいの状態とご希望に合わせた、リフォームの施工イメージをご紹介します。',
    seoDescription: '宮城・仙台のリフォーム施工イメージ集。外壁塗装・屋根・玄関・キッチン・水まわりなど、住まいの状態とご希望に合わせたLALA（ララ株式会社）の施工例をビフォーアフターでご紹介します。',
    path: '/works',
  },
  services: {
    label: 'Services',
    title: 'サービスメニュー',
    description: '診断から施工まで、自社対応で住まいのお悩みに幅広くお応えします。',
    seoDescription: '宮城・仙台の住宅リフォームサービス一覧。塗装・外装・内装・水まわり・足場・解体・床下工事まで、診断から施工までLALA（ララ株式会社）が自社対応でお応えします。',
    path: '/services',
  },
  company: {
    label: 'Company',
    title: '会社概要',
    description: '宮城・仙台に根ざし、自社施工・自社管理で住まいの工事を一貫して支えるララ株式会社です。',
    seoDescription: '仙台市太白区に拠点を置くララ株式会社（LALA）の会社概要。宮城・仙台地域密着で、自社施工・自社管理により住まいのリフォーム工事を一貫して支えます。',
    path: '/company',
  },
  voices: {
    label: 'Voice',
    title: 'お客様の声',
    description: 'リフォームをご相談いただいたお客様から寄せられた声をご紹介します。',
    seoDescription: '宮城・仙台でLALA（ララ株式会社）にリフォームをご相談いただいたお客様の声。工事前のお悩みから施工後のご感想まで、実際の体験談をご紹介します。',
    path: '/voices',
  },
  blog: {
    label: 'Blog',
    title: '施工イメージ更新情報',
    description: '日々の施工イメージや住まいづくりの情報をInstagramで更新しています。',
    seoDescription: 'LALA（ララ株式会社）の最新施工イメージ更新情報。宮城・仙台の住まいづくりや日々の施工例をInstagramで発信しています。',
    path: '/blog',
  },
};

const instagramImages = [
  '/images/renovation-hero-living.webp', '/images/renovation-exterior-roof.webp',
  '/images/renovation-bath-wash.webp', '/images/renovation-kitchen-ldk.webp',
  '/images/renovation-entrance.webp', '/images/renovation-garden.webp',
];

const companyServices = [
  '外壁サイディング',
  '外壁塗装',
  '屋根葺替',
  '屋根塗装',
  '雨樋交換',
  'サッシ交換',
  '玄関',
  '給湯設備機器',
  'エコキュート',
  '太陽光発電',
  '外構フェンス工事',
  '下水工事',
  '足場仮設',
  '解体工事',
  '内装工事一式',
  'クロス張り替え',
  'オール電化',
  '風呂、トイレ、キッチン、洗面化粧台等の水まわり工事',
  'アリ駆除',
  '害虫駆除',
  '床下工事',
];

function PageBody({ page }: { page: SitePageKey }) {
  if (page === 'services') {
    return <div className={styles.serviceDetailGrid}>{serviceDetails.map((service) => (
      <article id={`service-${service.number}`} className={styles.serviceDetailItem} key={service.number}>
        <img src={service.image} alt={`${service.title}の施工イメージ`} width="800" height="600" loading="lazy" decoding="async" fetchPriority="low" />
        <div className={styles.serviceDetailBody}>
          <span className={styles.number}>{service.number}</span>
          <h2>{service.title}</h2>
          <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>{service.text}</p>
          <a href="/contact">この工事について相談する →</a>
        </div>
      </article>
    ))}</div>;
  }

  if (page === 'works') {
    return <div className={styles.workGrid}>{works.map((work) => (
      <article className={styles.workItem} key={work.title}>
        <div className={styles.workImages}>
          <figure><img src={work.before} alt={`${work.title}の施工前`} width="640" height="480" loading="lazy" decoding="async" fetchPriority="low" /><figcaption>Before</figcaption></figure>
          <figure><img src={work.after} alt={`${work.title}の施工後`} width="640" height="480" loading="lazy" decoding="async" fetchPriority="low" /><figcaption>After</figcaption></figure>
        </div>
        <div>{(work.area || work.period) && <span className={styles.eyebrow}>{[work.area, work.period].filter(Boolean).join(' / ')}</span>}<h2>{work.title}</h2><p>{work.text}</p><a className={styles.pageLink} href="/contact">同様の工事を相談する →</a></div>
      </article>
    ))}</div>;
  }

  if (page === 'company') {
    return <div className={styles.companyLayout}>
      <div><p className={styles.companyCopy}>診断から施工まで、<br />住まいの悩みに自社対応。</p><p className={styles.companyText}>ララ株式会社は、宮城・仙台を中心に住まいのお悩みに寄り添う地域密着のリフォーム会社です。小さな修繕から大規模な工事まで、状況を丁寧に確認し、必要な施工をご提案します。</p><div className={styles.companyMap}><iframe src="https://www.google.com/maps?q=宮城県仙台市太白区長町南4丁目12-16&output=embed" title="ララ株式会社 所在地" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><p className={styles.companyMapAddress}>〒982-0012　宮城県仙台市太白区長町南4丁目12-16</p></div>
      <dl className={styles.definitionList}>
        <div><dt>名称</dt><dd>ララ株式会社</dd></div>
        <div><dt>代表者名</dt><dd>代表取締役　栗原 裕輔</dd></div>
        <div><dt>所在地</dt><dd>〒982-0012　宮城県仙台市太白区長町南4丁目12-16</dd></div>
        <div><dt>TEL / FAX</dt><dd><a href="tel:0227484297">TEL 022-748-4297</a><br />FAX 022-748-4298</dd></div>
        <div><dt>資本金</dt><dd>300万円</dd></div>
        <div><dt>従業員</dt><dd>36名（令和4年11月現在）</dd></div>
        <div className={styles.companyServicesRow}>
          <dt>事業案内</dt>
          <dd><ul className={styles.companyServices}>{companyServices.map((service) => <li key={service}>{service}</li>)}</ul></dd>
        </div>
        <div>
          <dt>業務提携会社</dt>
          <dd><strong>株式会社 FIND</strong><br />〒980-0803　宮城県仙台市青葉区国分町3-6-11 アーク仙台ビル3F<br /><a href="tel:0223954355">TEL 022-395-4355</a>　FAX 022-211-8782</dd>
        </div>
      </dl>
    </div>;
  }

  if (page === 'voices') {
    return <div className={styles.voiceStories}>{voiceStories.map((voice) => (
      <article className={styles.voiceStory} key={voice.number}>
        <header>
          <span className={styles.voiceNumber}>Voice {voice.number}</span>
          <h2>{voice.title}</h2>
          <p>{voice.area} / {voice.age}</p>
        </header>
        <dl className={styles.voiceDetails}>
          <div><dt>実施内容</dt><dd>{voice.service}</dd></div>
          <div><dt>工事前の悩み</dt><dd>{voice.concern}</dd></div>
          <div><dt>LALAに相談した理由</dt><dd>{voice.reason}</dd></div>
          <div className={styles.voiceImpression}><dt>工事後の感想</dt><dd>{voice.impression}</dd></div>
        </dl>
      </article>
    ))}</div>;
  }

  if (page === 'blog') {
    return <div className={styles.blogLayout}>
      <div><span className={styles.eyebrow}>@lalareform</span><h2 className={styles.sectionTitle}>Instagramで<br />施工例を更新中</h2><p className={styles.companyText}>最新の施工例や住まいづくりの様子をご覧いただけます。</p><a className={styles.pageLink} href="https://www.instagram.com/lalareform/" target="_blank" rel="noreferrer">Instagramを見る →</a></div>
      <div className={styles.blogGrid}>{instagramImages.map((image) => <img key={image} src={image} alt="施工イメージ" width="480" height="480" loading="lazy" decoding="async" fetchPriority="low" />)}</div>
    </div>;
  }

  return null;
}

export function SiteContentPage({ page }: { page: SitePageKey }) {
  const meta = pageMeta[page];
  const heroVariant = page === 'company'
    ? styles.companyHero
    : page === 'works'
      ? styles.worksHero
      : page === 'services'
        ? styles.servicesHero
        : page === 'voices'
          ? styles.voicesHero
          : '';
  useSeo({
    title: meta.title,
    description: meta.seoDescription,
    path: meta.path,
    breadcrumb: [
      { name: 'ホーム', path: '/' },
      { name: meta.title, path: meta.path },
    ],
  });

  return <div id="top" className={styles.page}>
    <Header />
    <main id="main">
      <header className={`${styles.hero} ${heroVariant}`}><Breadcrumb trail={[{ name: 'ホーム', path: '/' }, { name: meta.title, path: meta.path }]} /><span>{meta.label}</span><h1>{meta.title}</h1><p>{meta.description}</p><a href="/">← トップページへ戻る</a></header>
      <section className={styles.content} aria-label={meta.title}><PageBody page={page} /></section>
    </main>
    <SiteClosing showCta />
  </div>;
}

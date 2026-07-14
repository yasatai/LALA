import { siteFaqs } from '../data/siteFaqs';
import type { BreadcrumbTrail, SeoConfig } from './seo';

const HOME_CRUMB = { name: 'ホーム', path: '/' };

/** FAQPage 構造化データ（トップページの「よくある質問」から生成） */
function faqPageJsonLd(): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: siteFaqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

function trail(name: string, path: string): BreadcrumbTrail {
  return [HOME_CRUMB, { name, path }];
}

/**
 * 各ルートのSEOメタ。地域キーワード（宮城・仙台）をタイトル/説明に配置し、
 * 下層ページにはパンくずリストの構造化データを付与する。
 */
export const homeSeo: SeoConfig = {
  title: '宮城・仙台の住宅リフォーム',
  description:
    '宮城・仙台の住宅リフォームならLALA（ララ株式会社）。外壁塗装・屋根・水まわりから内装まで、地域密着の自社施工で小さな修繕から大規模リフォームまで対応します。無料相談受付中。',
  path: '/',
  jsonLd: [faqPageJsonLd()],
};

export const contactSeo: SeoConfig = {
  title: 'お問い合わせ・無料相談',
  description:
    '宮城・仙台の住宅リフォームのご相談はLALA（ララ株式会社）へ。外壁塗装・屋根・水まわり・内装リフォームの無料相談・お見積もりを受け付けています。',
  path: '/contact',
  breadcrumb: trail('お問い合わせ', '/contact'),
};

export const privacyPolicySeo: SeoConfig = {
  title: 'プライバシーポリシー',
  description:
    'ララ株式会社のプライバシーポリシー（個人情報保護方針）です。当社が取得する個人情報の利用目的、第三者提供、安全管理措置等について定めています。',
  path: '/privacy-policy',
  breadcrumb: trail('プライバシーポリシー', '/privacy-policy'),
};

import { useEffect } from 'react';

/**
 * 本番ドメイン。canonical / og:url / sitemap の絶対URLの基点。
 * ドメインが変わる場合はこの1箇所を書き換えれば全ページに反映される。
 */
export const SITE_URL = 'https://miyagi-tosou.com';

export const SITE_NAME = 'LALA ララ株式会社';

export type BreadcrumbTrail = { name: string; path: string }[];

export type SeoConfig = {
  /** <title> に入れるページ固有のタイトル（サイト名は自動付与） */
  title: string;
  /** meta description（120〜160字目安、地域キーワードを含める） */
  description: string;
  /** ルートパス（例: '/works'）。canonical と og:url に使用 */
  path: string;
  /** noindex にする場合 true */
  noindex?: boolean;
  /** パンくずリスト。指定すると BreadcrumbList 構造化データを出力 */
  breadcrumb?: BreadcrumbTrail;
  /** ページ固有の追加 JSON-LD（FAQPage など） */
  jsonLd?: Record<string, unknown>[];
};

const JSONLD_ID = 'seo-page-jsonld';

function absoluteUrl(path: string): string {
  if (path === '/' || path === '') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.append(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.append(el);
  }
  el.href = href;
}

function setRobots(noindex: boolean) {
  const selector = 'meta[name="robots"]';
  if (noindex) {
    upsertMeta(selector, 'name', 'robots', 'noindex, follow');
  } else {
    document.head.querySelector(selector)?.remove();
  }
}

function buildJsonLd(config: SeoConfig): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = [];

  if (config.breadcrumb && config.breadcrumb.length > 0) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: config.breadcrumb.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  }

  for (const entry of config.jsonLd ?? []) {
    graph.push({ '@context': 'https://schema.org', ...entry });
  }

  return graph;
}

/**
 * ページのメタ情報（title / description / canonical / OGP / robots）と
 * 構造化データ（JSON-LD）をクライアントサイドルーティングに合わせて更新する。
 */
export function applySeo(config: SeoConfig): void {
  const fullTitle = `${config.title}｜${SITE_NAME}`;
  const url = absoluteUrl(config.path);

  document.title = fullTitle;
  upsertMeta('meta[name="description"]', 'name', 'description', config.description);
  upsertLink('canonical', url);

  upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', config.description);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', config.path === '/' ? 'website' : 'article');

  setRobots(Boolean(config.noindex));

  const existing = document.getElementById(JSONLD_ID);
  existing?.remove();

  const graph = buildJsonLd(config);
  if (graph.length > 0) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = JSONLD_ID;
    script.text = JSON.stringify(graph.length === 1 ? graph[0] : graph);
    document.head.append(script);
  }
}

/** React コンポーネントからページSEOを適用するフック */
export function useSeo(config: SeoConfig): void {
  const deps = [
    config.title,
    config.description,
    config.path,
    config.noindex,
    JSON.stringify(config.breadcrumb),
    JSON.stringify(config.jsonLd),
  ];

  useEffect(() => {
    applySeo(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

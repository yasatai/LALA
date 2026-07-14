// Vite の base（本番レンタルサーバー = '/'、GitHub Pages プレビュー = '/LALA/'）に応じて
// アプリ内の絶対パス（リンク・画像）へ base を付与するためのヘルパー。
// 本番（base '/'）では入力をそのまま返すため、既存挙動に影響しない。

const BASE = import.meta.env.BASE_URL; // '/' もしくは '/LALA/'
const BASE_NO_TRAILING = BASE.replace(/\/$/, ''); // '' もしくは '/LALA'

/**
 * アプリ内の絶対パス（'/contact' や '/images/x.webp'）に base を付与する。
 * 外部URL（http〜）やアンカーのみ（'#...'）はそのまま返す。
 */
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  if (!BASE_NO_TRAILING) return path;
  return BASE_NO_TRAILING + path;
}

/**
 * srcSet 文字列（"url1 320w, url2 640w"）内の各URLに base を付与する。
 */
export function withBaseSrcSet(srcSet: string): string {
  if (!BASE_NO_TRAILING) return srcSet;
  return srcSet
    .split(',')
    .map((entry) => {
      const trimmed = entry.trim();
      const [url, ...descriptor] = trimmed.split(/\s+/);
      return [withBase(url), ...descriptor].join(' ');
    })
    .join(', ');
}

/**
 * ブラウザの pathname から base を取り除き、アプリ内ルート判定用のパスに正規化する。
 * '/LALA/contact' -> '/contact'、'/LALA/' -> '/'、本番では入力そのまま。
 */
export function stripBase(pathname: string): string {
  if (BASE_NO_TRAILING && pathname.startsWith(BASE_NO_TRAILING)) {
    return pathname.slice(BASE_NO_TRAILING.length) || '/';
  }
  return pathname;
}

import { withBase } from '../../lib/basePath';
import type { BreadcrumbTrail } from '../../seo/seo';
import styles from './Breadcrumb.module.css';

/**
 * 画面表示用パンくずリスト。SEO用の BreadcrumbList 構造化データは
 * 各ページの useSeo(breadcrumb) 側で出力する。
 */
export function Breadcrumb({ trail }: { trail: BreadcrumbTrail }) {
  return (
    <nav className={styles.breadcrumb} aria-label="パンくずリスト">
      <ol>
        {trail.map((crumb, index) => {
          const isCurrent = index === trail.length - 1;
          return (
            <li key={crumb.path}>
              {isCurrent ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <a href={withBase(crumb.path)}>{crumb.name}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

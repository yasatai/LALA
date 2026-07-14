import { useEffect } from 'react';
import { SiteClosing } from '../components/Footer/SiteClosing';
import { Header } from '../components/Header/Header';
import { withBase } from '../lib/basePath';
import styles from './Home.module.css';

export function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobots = existingRobots?.content;
    const robots = existingRobots ?? document.createElement('meta');

    if (!existingRobots) {
      robots.name = 'robots';
      document.head.append(robots);
    }

    document.title = 'ページが見つかりません｜LALA ララ株式会社';
    robots.content = 'noindex, follow';

    return () => {
      document.title = previousTitle;
      if (existingRobots && previousRobots !== undefined) {
        existingRobots.content = previousRobots;
      } else {
        robots.remove();
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main id="main" className={styles.notFoundPage}>
        <span id="top" aria-hidden="true" />
        <p className={styles.notFoundCode}>404</p>
        <h1>ページが見つかりません</h1>
        <p>URLが変更されたか、ページが削除された可能性があります。</p>
        <div className={styles.notFoundActions}>
          <a href={withBase('/')}>トップページへ戻る</a>
          <a href={withBase('/contact')}>お問い合わせ</a>
        </div>
      </main>
      <SiteClosing />
    </>
  );
}

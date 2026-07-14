import { lazy, Suspense } from 'react';
import { BottomNavigation } from './components/BottomNavigation/BottomNavigation';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import type { SitePageKey } from './pages/SiteContentPage';

const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then((module) => ({ default: module.PrivacyPolicy })));
const SiteContentPage = lazy(() => import('./pages/SiteContentPage').then((module) => ({ default: module.SiteContentPage })));

const sitePages: Record<string, SitePageKey> = {
  '/works': 'works',
  '/services': 'services',
  '/company': 'company',
  '/voices': 'voices',
  '/blog': 'blog',
};

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';
  let page;

  if (path === '/privacy-policy') {
    page = <PrivacyPolicy />;
  } else if (path === '/contact') {
    page = <ContactPage />;
  } else if (sitePages[path]) {
    page = <SiteContentPage page={sitePages[path]} />;
  } else if (path === '') {
    page = <Home />;
  } else {
    page = <NotFound />;
  }

  return (
    <>
      <Suspense fallback={<main id="main" className="route-fallback" aria-busy="true" />}>
        {page}
      </Suspense>
      <BottomNavigation currentPath={path || '/'} />
    </>
  );
}

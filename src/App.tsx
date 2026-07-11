import { Home } from './pages/Home';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { SiteContentPage, type SitePageKey } from './pages/SiteContentPage';

const sitePages: Record<string, SitePageKey> = {
  '/works': 'works',
  '/services': 'services',
  '/company': 'company',
  '/voices': 'voices',
  '/blog': 'blog',
};

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';

  if (path === '/privacy-policy') {
    return <PrivacyPolicy />;
  }

  if (path === '/contact') {
    return <ContactPage />;
  }

  if (sitePages[path]) {
    return <SiteContentPage page={sitePages[path]} />;
  }

  return <Home />;
}

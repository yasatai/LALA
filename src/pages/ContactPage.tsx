import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb';
import { ContactSection } from '../components/CTA/ContactSection';
import { SiteClosing } from '../components/Footer/SiteClosing';
import { Header } from '../components/Header/Header';
import { contactSeo } from '../seo/pageSeo';
import { useSeo } from '../seo/seo';
import styles from './Home.module.css';

export function ContactPage() {
  useSeo(contactSeo);

  return (
    <>
      <Header />
      <main id="main" className={styles.contactPage}>
        <span id="top" aria-hidden="true" />
        <Breadcrumb trail={contactSeo.breadcrumb!} />
        <ContactSection />
      </main>
      <SiteClosing />
    </>
  );
}

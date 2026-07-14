import { ContactSection } from '../components/CTA/ContactSection';
import { SiteClosing } from '../components/Footer/SiteClosing';
import { Header } from '../components/Header/Header';
import styles from './Home.module.css';

export function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className={styles.contactPage}>
        <span id="top" aria-hidden="true" />
        <ContactSection />
      </main>
      <SiteClosing />
    </>
  );
}

import { FinalCTA } from '../components/CTA/FinalCTA';
import { AreaStorySection } from '../components/AreaStory/AreaStorySection';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { InstagramSection } from '../components/Instagram/InstagramSection';
import { PromiseSection } from '../components/Promise/PromiseSection';
import { ServicesSection } from '../components/Services/ServicesSection';
import { VoiceSection } from '../components/Voice/VoiceSection';
import { WorksSection } from '../components/Works/WorksSection';
import styles from './Home.module.css';

export function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <PromiseSection />
        <ServicesSection />
        <AreaStorySection />
        <WorksSection />
        <div className={styles.community}>
          <VoiceSection />
          <InstagramSection />
        </div>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

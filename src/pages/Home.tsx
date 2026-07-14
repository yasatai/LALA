import { useRef } from 'react';
import { DeferredAreaStory } from '../components/AreaStory/DeferredAreaStory';
import { SiteClosing } from '../components/Footer/SiteClosing';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { InstagramSection } from '../components/Instagram/InstagramSection';
import { PromiseSection } from '../components/Promise/PromiseSection';
import { ServicesSection } from '../components/Services/ServicesSection';
import { VoiceSection } from '../components/Voice/VoiceSection';
import { WorksSection } from '../components/Works/WorksSection';
import { useTopPageMotion } from '../hooks/useTopPageMotion';
import { homeSeo } from '../seo/pageSeo';
import { useSeo } from '../seo/seo';
import '../styles/top-page-motion.css';
import styles from './Home.module.css';

export function Home() {
  const motionRootRef = useRef<HTMLDivElement>(null);
  useTopPageMotion(motionRootRef);
  useSeo(homeSeo);

  return (
    <div ref={motionRootRef} className="top-page-motion-root">
      <Header />
      <main id="main">
        <Hero />
        <PromiseSection />
        <ServicesSection />
        <DeferredAreaStory />
        <WorksSection />
        <div className={styles.community}>
          <VoiceSection />
          <InstagramSection />
        </div>
      </main>
      <SiteClosing showCta />
    </div>
  );
}

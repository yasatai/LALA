import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../pages/Home.module.css';
import { MiyagiMunicipalityMap } from './MiyagiMunicipalityMap';
import { prepareStoryImages, scheduleIdleTask } from './storyPreparation';

const assurances = [
  ['01', '相談・見積り無料', 'まずは話を聞くだけでも大丈夫です。'],
  ['02', '無理な営業なし', '必要のない工事を強くすすめることはありません。'],
  ['03', '小さな修繕も歓迎', '外壁・屋根・水まわりなど、気になることからご相談ください。'],
];

const consultationFlow = [
  ['01', 'ご相談', '住まいのお困りごとを、お気軽にお聞かせください。'],
  ['02', '現地確認', '必要に応じて現地を確認し、状態を丁寧に確認します。'],
  ['03', 'お見積り', '内容と費用を分かりやすくご説明します。お見積りは無料です。'],
  ['04', 'ご納得後に施工', '内容にご納得いただいてから、施工へ進みます。'],
];

export function AreaStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState('04100');
  const [mapReady, setMapReady] = useState(false);
  const handleMapReady = useCallback(() => setMapReady(true), []);

  useEffect(() => scheduleIdleTask(() => {
    void prepareStoryImages();
  }), []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stageRef.current) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const root = sectionRef.current;
    const stage = stageRef.current;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([`.${styles.storyIntro}`, `.${styles.municipalityDirectory}`], { opacity: 0 });
        gsap.set(`.${styles.storyMap}`, { opacity: 0 });
        gsap.set(`.${styles.storyStationCircle}`, { opacity: 1, clipPath: 'circle(120% at 72% 54%)' });
        gsap.set([`.${styles.storyAbout}`, `.${styles.storyInfoPanel}`], { opacity: 1, x: 0, y: 0 });
      });

      media.add(
        {
          desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
          mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        },
        (mediaContext) => {
          const isDesktop = Boolean(mediaContext.conditions?.desktop);
          const setActive = (active: boolean) => root.classList.toggle(styles.areaStoryActive, active);
          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              id: 'service-area-story',
              trigger: root,
              start: 'top top',
              end: isDesktop ? '+=180%' : '+=48%',
              scrub: isDesktop ? 0.7 : 0.35,
              pin: stage,
              pinSpacing: true,
              anticipatePin: 1,
              fastScrollEnd: true,
              invalidateOnRefresh: false,
              onEnter: () => setActive(true),
              onEnterBack: () => setActive(true),
              onLeave: () => setActive(false),
              onLeaveBack: () => setActive(false),
            },
          });

          timeline
            .to([`.${styles.storyIntro}`, `.${styles.municipalityDirectory}`], { opacity: 0, y: -34, duration: 0.16 }, 0.12)
            .to(
              `.${styles.storyMap}`,
              {
                scale: isDesktop ? 5.2 : 2.1,
                xPercent: isDesktop ? -7 : -3,
                yPercent: isDesktop ? 11 : 5,
                duration: 0.48,
              },
              0.24,
            )
            .fromTo(
              `.${styles.storyStationCircle}`,
              { opacity: 0, clipPath: `circle(0% at ${isDesktop ? '72% 54%' : '64% 48%'})` },
              { opacity: 1, clipPath: `circle(120% at ${isDesktop ? '72% 54%' : '64% 48%'})`, duration: 0.42 },
              0.44,
            )
            .to(`.${styles.storyMapReveal}`, { opacity: 0, duration: 0.12 }, 0.74)
            .fromTo(
              `.${styles.storyAbout}`,
              { opacity: 0, x: isDesktop ? -28 : 0, y: 18 },
              { opacity: 1, x: 0, y: 0, duration: 0.22, ease: 'power2.out' },
              0.81,
            )
            .fromTo(
              `.${styles.storyInfoPanel}`,
              { opacity: 0, x: isDesktop ? 34 : 0, y: 18 },
              { opacity: 1, x: 0, y: 0, duration: 0.22, ease: 'power2.out' },
              0.87,
            );

          return () => {
            setActive(false);
            timeline.scrollTrigger?.kill();
          };
        },
      );
    }, sectionRef);

    return () => {
      root.classList.remove(styles.areaStoryActive);
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.areaStory} aria-labelledby="area-story-title">
      <div ref={stageRef} className={styles.areaStoryStage}>
        <div className={styles.storyIntro}>
          <span>Our Service Area</span>
          <h2 id="area-story-title">住まいの悩みに応えるために、<br />私たちは宮城の街へ。</h2>
          <p>仙台市を中心に、暮らしのそばへ。地域を知る私たちだからできる、迅速で丁寧な住まいづくりがあります。</p>
        </div>

        <div
          className={styles.storyMapReveal}
          data-map-state={mapReady ? 'visible' : 'loading'}
          aria-hidden={!mapReady}
          style={!mapReady ? { opacity: 0, visibility: 'hidden', pointerEvents: 'none' } : undefined}
        >
          <MiyagiMunicipalityMap
            selectedCode={selectedMunicipality}
            onSelect={setSelectedMunicipality}
            onReady={handleMapReady}
          />
        </div>

        <div className={styles.storyStationCircle} aria-hidden="true">
          <img
            className={styles.storyStationImage}
            src="/images/sendai-station.jpg"
            alt=""
            width="1920"
            height="1440"
            decoding="async"
          />
        </div>

        <div className={styles.storyFinalContent}>
          <div className={styles.storyAbout}>
            <span>Rooted in Sendai</span>
            <h2>仙台に根ざした<br />住まいの相談役</h2>
            <p>ララリフォームは、宮城・仙台を中心に、住まいのお悩みに寄り添う地域密着のリフォーム会社です。小さな修繕から大規模リフォームまで、自社対応による確かな品質でお応えします。</p>
            <div className={styles.storyConsultationNote}>
              <strong>まずは相談だけでも大丈夫です</strong>
              <p>ご相談・お見積りは無料です。無理な営業はせず、住まいの状態に合わせて必要なことだけをご案内します。</p>
            </div>
            <div className={styles.storyAboutActions}>
              <a href="/contact">私たちに相談する <b aria-hidden="true">→</b></a>
              <a className={styles.storyAboutSecondary} href="/company">会社概要を見る <b aria-hidden="true">→</b></a>
            </div>
          </div>

          <aside className={styles.storyInfoPanel}>
            <h3>お問い合わせ前のご不安に</h3>
            <ol className={styles.storyInfoList}>
              {assurances.map(([number, title, text]) => (
                <li key={number}><b>{number}</b><div><strong>{title}</strong><p>{text}</p></div></li>
              ))}
            </ol>
            <h3>ご相談から施工まで</h3>
            <ol className={styles.storyInfoList}>
              {consultationFlow.map(([number, title, text]) => (
                <li key={number}><b>{number}</b><div><strong>{title}</strong><p>{text}</p></div></li>
              ))}
            </ol>
          </aside>
        </div>

      </div>
    </section>
  );
}

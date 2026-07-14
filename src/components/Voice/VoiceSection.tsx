import { voices } from '../../data/lala';
import { siteFaqs } from '../../data/siteFaqs';
import { withBase } from '../../lib/basePath';
import { Arrow } from '../LalaPrimitives';
import { VoiceCard } from './VoiceCard';
import styles from '../../pages/Home.module.css';

export function VoiceSection() {
  return (
    <section id="voice" className={styles.voice} aria-labelledby="voice-title">
      <div data-motion-group="voice" className={styles.voiceOverview}>
        <div data-motion-item data-motion-order="0" className={styles.sectionHead}>
          <h2 id="voice-title">お客様の声</h2>
          <a href={withBase('/voices')}>すべての声を見る <Arrow /></a>
        </div>
        <div className={styles.voiceGrid}>
          {voices.map((item, index) => <VoiceCard key={item.name} item={item} motionOrder={index + 1} />)}
        </div>
      </div>
      <div data-motion-group="voice" className={styles.voiceFaqMotion}>
        <div data-motion-item data-motion-order="0" className={styles.voiceFaq}>
          <div className={styles.voiceFaqHead}><span>FAQ</span><h3>よくある質問</h3></div>
          <div className={styles.voiceFaqList}>
            {siteFaqs.map(([question, answer]) => <details data-faq-item key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </div>
    </section>
  );
}

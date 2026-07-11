import { voices } from '../../data/lala';
import { siteFaqs } from '../../data/siteFaqs';
import { Arrow } from '../LalaPrimitives';
import { VoiceCard } from './VoiceCard';
import styles from '../../pages/Home.module.css';

export function VoiceSection() {
  return (
    <section id="voice" className={styles.voice} aria-labelledby="voice-title">
      <div className={styles.sectionHead}>
        <h2 id="voice-title">お客様の声</h2>
        <a href="/voices">すべての声を見る <Arrow /></a>
      </div>
      <div className={styles.voiceGrid}>
        {voices.map((item) => <VoiceCard key={item.name} item={item} />)}
      </div>
      <div className={styles.voiceFaq}>
        <div className={styles.voiceFaqHead}><span>FAQ</span><h3>よくある質問</h3></div>
        <div className={styles.voiceFaqList}>
          {siteFaqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}

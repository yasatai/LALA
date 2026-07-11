import type { voices } from '../../data/lala';
import styles from '../../pages/Home.module.css';
import { Arrow } from '../LalaPrimitives';

type VoiceItem = (typeof voices)[number];

interface VoiceCardProps {
  item: VoiceItem;
}

export function VoiceCard({ item }: VoiceCardProps) {
  return (
    <article className={styles.voiceCard}>
      <a className={styles.voiceCardLink} href="/voices" aria-label={`${item.quote}のお客様の声を詳しく見る`}>
        <img src={item.image} alt={`${item.name}のイメージ`} width="220" height="220" loading="lazy" />
        <div>
          <blockquote>{item.quote}</blockquote>
          <p>{item.text}</p>
          <span>{item.name} / {item.detail}</span>
        </div>
        <span className={styles.voiceCardArrow} aria-hidden="true"><Arrow /></span>
      </a>
    </article>
  );
}

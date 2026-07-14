import type { voices } from '../../data/lala';
import styles from '../../pages/Home.module.css';
import { Arrow } from '../LalaPrimitives';

type VoiceItem = (typeof voices)[number];

interface VoiceCardProps {
  item: VoiceItem;
  motionOrder: number;
}

const quotePhrases: Record<string, readonly [string, string]> = {
  '家族の時間が増えました': ['家族の時間が', '増えました'],
  '相談しやすくて安心でした': ['相談しやすくて', '安心でした'],
  '仕上がりに大満足です。': ['仕上がりに', '大満足です。'],
  '説明が分かりやすく安心でした': ['説明が分かりやすく', '安心でした'],
};

export function VoiceCard({ item, motionOrder }: VoiceCardProps) {
  const quoteParts = quotePhrases[item.quote];
  const optimizedImage = item.image.replace(/\.webp$/, '-320.webp');

  return (
    <article data-motion-item data-motion-order={motionOrder} className={styles.voiceCard}>
      <a className={styles.voiceCardLink} href="/voices" aria-label={`${item.quote}のお客様の声を詳しく見る`}>
        <img
          src={item.image}
          srcSet={`${optimizedImage} 320w`}
          sizes="84px"
          alt={`${item.name}のイメージ`}
          width="220"
          height="220"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <div>
          <blockquote>
            {quoteParts ? <><span className={styles.voiceCardQuotePhrase}>{quoteParts[0]}</span><wbr /><span className={styles.voiceCardQuotePhrase}>{quoteParts[1]}</span></> : item.quote}
          </blockquote>
          <p>{item.text}</p>
          <span>{item.name} / {item.detail}</span>
        </div>
        <span className={styles.voiceCardArrow} aria-hidden="true"><Arrow /></span>
      </a>
    </article>
  );
}

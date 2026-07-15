import type { voices } from '../../data/lala';
import { withBase, withBaseSrcSet } from '../../lib/basePath';
import { glueJa, gluePhrases } from '../../lib/jaText';
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

// 本文の改行位置を文節単位に制御する（語中で折り返さない・行末に「、」を残さない）
const textPhrases: Record<string, string[]> = {
  '毎日の使いやすさまで考えてくださり、職人さんの説明も丁寧でした。': ['毎日の', '使いやすさまで', '考えて', 'くださり、職人さんの', '説明も', '丁寧でした。'],
  '初めてのリフォームでしたが、段階ごとに説明があり安心できました。': ['初めての', 'リフォーム', 'でしたが、段階ごとに', '説明があり', '安心できました。'],
  '細かな要望にも応えていただき、毎日の暮らしが快適になりました。': ['細かな要望にも', '応えて', 'いただき、毎日の', '暮らしが', '快適になりました。'],
  '工事内容や費用を丁寧に説明してくださり、納得してお願いできました。': ['工事内容や費用を', '丁寧に', '説明して', 'くださり、納得して', 'お願いできました。'],
};

export function VoiceCard({ item, motionOrder }: VoiceCardProps) {
  const quoteParts = quotePhrases[item.quote];
  const optimizedImage = item.image.replace(/\.webp$/, '-320.webp');

  return (
    <article data-motion-item data-motion-order={motionOrder} className={styles.voiceCard}>
      <a className={styles.voiceCardLink} href={withBase('/voices')} aria-label={`${item.quote}のお客様の声を詳しく見る`}>
        <img
          src={withBase(item.image)}
          srcSet={withBaseSrcSet(`${optimizedImage} 320w`)}
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
          <p>{textPhrases[item.text] ? gluePhrases(...textPhrases[item.text]) : glueJa(item.text)}</p>
          <span>{item.name} / {gluePhrases(item.detail)}</span>
        </div>
        <span className={styles.voiceCardArrow} aria-hidden="true"><Arrow /></span>
      </a>
    </article>
  );
}

// 日本語テキストの改行位置を制御するユーティリティ。
// U+2060 (WORD JOINER) は「前後の文字間で改行しない」ことを示す不可視文字。
const WJ = '\u2060';

const CJK = 'ぁ-んァ-ヶー一-龯々〆';

const COMMA_GLUE = /、/g;
const KATAKANA_RUN = /([ァ-ヶー])(?=[ァ-ヶー])/g;
const CJK_TO_ALNUM = new RegExp(`([${CJK}])(?=[0-9A-Za-z])`, 'g');
const ALNUM_TO_CJK = new RegExp(`([0-9A-Za-z])(?=[${CJK}])`, 'g');
const NUMBER_HYPHEN = /([0-9])-(?=[0-9])/g;

// 表示テキストの改行ルールを適用する:
// - 「、」の直後で改行しない（行末に読点を残さない）
// - カタカナ語の途中で改行しない
// - 英数字と日本語の境界・番地などのハイフンで改行しない
// - 行末の1〜2文字孤立を防ぐため、末尾4文字を分離しない
export function glueJa(text: string): string {
  const glued = text
    .replace(COMMA_GLUE, `、${WJ}`)
    .replace(KATAKANA_RUN, `$1${WJ}`)
    .replace(CJK_TO_ALNUM, `$1${WJ}`)
    .replace(ALNUM_TO_CJK, `$1${WJ}`)
    .replace(NUMBER_HYPHEN, `$1${WJ}-${WJ}`);
  const chars = [...glued];
  let joined = 0;
  for (let i = chars.length - 1; i > 0 && joined < 3; i--) {
    if (chars[i] === WJ) continue;
    if (chars[i - 1] !== WJ) {
      chars.splice(i, 0, WJ);
    }
    joined++;
  }
  return chars.join('');
}

// 語句の内部では改行させず、語句の区切りでのみ改行を許可する。
// 例: gluePhrases('確かな', '品質と施工') → 「確かな|品質と施工」の間でのみ折り返す
// 語句内の半角スペースは NBSP に変換する（ブラウザはスペース位置の改行を WJ では抑制しないため）
export function gluePhrases(...phrases: string[]): string {
  return phrases.map((phrase) => [...phrase.replace(/ /g, '\u00a0')].join(WJ)).join('');
}

// 「。」で文を区切り、1文ごとにブロック表示する。
// 「。」の直後に同じ行で文章が続かないことを全ての画面幅で保証する。
export function JaSentences({ text }: { text: string }) {
  const sentences = text
    .split(/(?<=。)/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  return (
    <>
      {sentences.map((sentence) => (
        <span key={sentence} style={{ display: 'block' }}>{glueJa(sentence)}</span>
      ))}
    </>
  );
}

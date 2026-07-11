import { useMemo, useState, type FormEvent } from 'react';
import type { AgeKey, DiagnosisResult, PlaceKey } from '../types';
import { ageOptions, ageMap, segLabels } from '../data/diagnosis';
import styles from './Contact.module.css';

const places: PlaceKey[] = ['屋根塗装', '外壁塗装', '屋根＋外壁'];

export function Contact() {
  const [step, setStep] = useState<1 | 2>(1);
  const [age, setAge] = useState<AgeKey | null>(null);
  const [place, setPlace] = useState<PlaceKey | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [consent, setConsent] = useState(false);

  const result = age ? ageMap[age] : null;

  const ageSummary = useMemo(() => {
    if (!age || !result) return null;
    const label = ageOptions.find((o) => o.key === age)?.label ?? '';
    return `築${label} ／ ${result.title}`;
  }, [age, result]);

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Hook this up to your backend / form endpoint.
    // eslint-disable-next-line no-console
    console.log('submit', { age, place, ...form, consent });
  };

  return (
    <section id="contact-link" className={styles.section}>
      <div className={styles.ring} />
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>CONTACT</div>
          <h2 className={styles.title}>無料相談</h2>
          <p className={styles.introLead}>
            まずは築年数から、塗り替え相談の目安をかんたん診断。
            <br />
            そのまま無料相談へお進みいただけます。
          </p>
        </div>

        <div className={styles.panel}>
          {step === 1 ? (
            <Step1
              age={age}
              setAge={setAge}
              result={result}
              onNext={() => setStep(2)}
            />
          ) : (
            <Step2
              ageSummary={ageSummary}
              onBack={() => setStep(1)}
              place={place}
              setPlace={setPlace}
              form={form}
              update={update}
              consent={consent}
              setConsent={setConsent}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Step 1: diagnosis ---------- */

interface Step1Props {
  age: AgeKey | null;
  setAge: (k: AgeKey) => void;
  result: DiagnosisResult | null;
  onNext: () => void;
}

function Step1({ age, setAge, result, onNext }: Step1Props) {
  return (
    <>
      <div className={styles.stepper}>
        <span className={styles.step}>
          <span className={`${styles.bullet} ${styles.bulletActive}`}>1</span>
          <span className={`${styles.stepLabel} ${styles.stepLabelActive}`}>築年数診断</span>
        </span>
        <span className={styles.connector} />
        <span className={styles.step}>
          <span className={`${styles.bullet} ${styles.bulletIdle}`}>2</span>
          <span className={`${styles.stepLabel} ${styles.stepLabelIdle}`}>ご相談</span>
        </span>
      </div>

      <h3 className={styles.q}>お住まいの築年数を教えてください</h3>
      <p className={styles.qSub}>前回の塗装からの年数でもOK。塗り替え相談の目安を簡易診断します。</p>

      <div className={styles.ageGrid}>
        {ageOptions.map((opt) => (
          <div
            key={opt.key}
            role="button"
            tabIndex={0}
            className={`${styles.choice} ${age === opt.key ? styles.choiceSelected : ''}`}
            onClick={() => setAge(opt.key)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setAge(opt.key)}
          >
            {opt.label}
          </div>
        ))}
      </div>

      {result && (
        <div className={styles.result}>
          <div className={styles.resultEyebrow}>DIAGNOSIS</div>
          <h4 className={styles.resultTitle}>{result.title}</h4>
          <p className={styles.resultMsg}>{result.msg}</p>
          <div className={styles.segs}>
            {segLabels.map((label, i) => {
              const active = result.lvl >= 1 && i === result.lvl - 1;
              return (
                <div key={label} className={`${styles.seg} ${active ? styles.segActive : ''}`}>
                  {label}
                </div>
              );
            })}
          </div>
          <div className={styles.resultNote}>
            ※あくまで目安です。正確な状態は無料診断でご確認いただけます。
          </div>
          <button
            type="button"
            className={`${styles.primaryBtn} ${styles.toStep2}`}
            onClick={onNext}
          >
            この診断をもとに無料相談する →
          </button>
        </div>
      )}
    </>
  );
}

/* ---------- Step 2: form ---------- */

interface Step2Props {
  ageSummary: string | null;
  onBack: () => void;
  place: PlaceKey | null;
  setPlace: (p: PlaceKey | null) => void;
  form: { name: string; phone: string; email: string; message: string };
  update: (key: 'name' | 'phone' | 'email' | 'message') => (e: { target: { value: string } }) => void;
  consent: boolean;
  setConsent: (v: boolean) => void;
  onSubmit: (e: FormEvent) => void;
}

function Step2({
  ageSummary,
  onBack,
  place,
  setPlace,
  form,
  update,
  consent,
  setConsent,
  onSubmit,
}: Step2Props) {
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.stepper}>
        <span className={styles.step}>
          <span className={`${styles.bullet} ${styles.bulletDone}`}>✓</span>
          <span className={`${styles.stepLabel} ${styles.stepLabelActive}`}>築年数診断</span>
        </span>
        <span className={`${styles.connector} ${styles.connectorDone}`} />
        <span className={styles.step}>
          <span className={`${styles.bullet} ${styles.bulletActive}`}>2</span>
          <span className={`${styles.stepLabel} ${styles.stepLabelActive}`}>ご相談</span>
        </span>
      </div>

      {ageSummary && (
        <div className={styles.summary}>
          <span className={styles.summaryTag}>診断結果</span>
          <span className={styles.summaryText}>{ageSummary}</span>
          <button type="button" className={styles.summaryReset} onClick={onBack}>
            築年数を選び直す
          </button>
        </div>
      )}

      <div className={styles.field}>
        <div className={styles.fieldLabel}>
          ご相談の箇所 <span className={styles.required}>必須</span>
        </div>
        <div className={styles.placeGrid}>
          {places.map((p) => (
            <div
              key={p}
              role="button"
              tabIndex={0}
              className={`${styles.placeChoice} ${place === p ? styles.placeChoiceSelected : ''}`}
              onClick={() => setPlace(place === p ? null : p)}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && setPlace(place === p ? null : p)
              }
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.inputRow}>
        <div>
          <label className={styles.label}>
            お名前 <span className={styles.required}>必須</span>
          </label>
          <input
            className={styles.input}
            placeholder="宮城 太郎"
            value={form.name}
            onChange={update('name')}
          />
        </div>
        <div>
          <label className={styles.label}>
            電話番号 <span className={styles.required}>必須</span>
          </label>
          <input
            className={styles.input}
            placeholder="022-000-0000"
            value={form.phone}
            onChange={update('phone')}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>メールアドレス</label>
        <input
          className={styles.input}
          placeholder="example@mail.com"
          value={form.email}
          onChange={update('email')}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          ご相談内容 <span className={styles.optional}>※任意</span>
        </label>
        <textarea
          className={styles.textarea}
          placeholder="気になる症状やご希望など、ご自由にご記入ください"
          value={form.message}
          onChange={update('message')}
        />
      </div>

      <label className={styles.consent}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          <a href="https://miyagi-tosou.com/privacypolicy/" target="_blank" rel="noreferrer">
            プライバシーポリシー
          </a>
          に同意する
        </span>
      </label>

      <button type="submit" className={`${styles.primaryBtn} ${styles.submit}`}>
        この内容で無料相談する
      </button>
      <p className={styles.disclaimer}>
        無理な営業・契約を迫ることはありません。お気軽にどうぞ。
      </p>
    </form>
  );
}

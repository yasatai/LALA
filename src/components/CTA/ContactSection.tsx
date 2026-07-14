import { useState } from 'react';
import type { FormEvent } from 'react';
import { Arrow } from '../LalaPrimitives';
import styles from '../../pages/Home.module.css';

type FormErrors = {
  name?: string;
  contact?: string;
  message?: string;
  privacy?: string;
  serverError?: string;
};

export function ContactSection() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: FormErrors = {};

    if (!String(form.get('name') ?? '').trim()) {
      nextErrors.name = 'お名前を入力してください。';
    }
    if (!String(form.get('phone') ?? '').trim() && !String(form.get('email') ?? '').trim()) {
      nextErrors.contact = '電話番号またはメールアドレスのいずれかを入力してください。';
    }
    if (!String(form.get('message') ?? '').trim()) {
      nextErrors.message = 'お問い合わせ内容を入力してください。';
    }
    if (form.get('privacy') !== 'agreed') {
      nextErrors.privacy = 'プライバシーポリシーへの同意が必要です。';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const data = Object.fromEntries(form);
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        event.currentTarget.reset();
      } else {
        const error = await response.json();
        setErrors({ serverError: error.message || 'エラーが発生しました。' });
      }
    } catch (err) {
      setErrors({ serverError: 'サーバーエラーが発生しました。' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
      <div className={styles.contactInner}>
        <div className={styles.contactIntro}>
          <span>Contact</span>
          <h1 id="contact-title">住まいのことを、<br />気軽にご相談ください。</h1>
          <p>診断・現地確認・お見積もりのご相談を承ります。小さな修繕も、まずは状況をお聞かせください。</p>
          <div className={styles.contactNotice}>
            <p>お問い合わせ・無料見積もりの送信は、工事契約の申込みではありません。</p>
            <p>正式なお見積もりは、現地確認・内容確認後にご提示します。</p>
            <p>工事契約は、見積書・工事内容等をご確認いただき、契約書面等により合意した時点で成立します。</p>
          </div>
        </div>

        {submitted ? (
          <div className={styles.contactSuccess} role="status" aria-live="polite">
            <span aria-hidden="true">✓</span>
            <h3>お問い合わせありがとうございます。</h3>
            <p>内容を確認のうえ、担当者よりご連絡いたします。</p>
            <p>この時点では、工事契約は成立していません。</p>
            <button type="button" onClick={() => setSubmitted(false)}>別の相談を入力する</button>
          </div>
        ) : (
          <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
            {errors.serverError && <p className={styles.formError}>{errors.serverError}</p>}
            <div className={styles.formGrid}>
              <label>
                <span>お名前 <b>必須</b></span>
                <input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />
                {errors.name && <small className={styles.formError}>{errors.name}</small>}
              </label>
              <label>
                <span>電話番号</span>
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" />
              </label>
              <label>
                <span>メールアドレス</span>
                <input name="email" type="email" inputMode="email" autoComplete="email" />
              </label>
              <label>
                <span>施工予定地</span>
                <input name="location" autoComplete="street-address" />
              </label>
              <label>
                <span>希望する工事内容</span>
                <select name="service" defaultValue="">
                  <option value="">選択してください</option>
                  <option>塗装工事</option>
                  <option>外装工事</option>
                  <option>内装工事</option>
                  <option>足場・解体</option>
                  <option>床下工事・駆除</option>
                  <option>店舗・アパート工事</option>
                  <option>その他</option>
                </select>
              </label>
              <label>
                <span>希望連絡方法</span>
                <select name="contactMethod" defaultValue="">
                  <option value="">指定なし</option>
                  <option>電話</option>
                  <option>メール</option>
                </select>
              </label>
            </div>
            {errors.contact && <p className={styles.formError}>{errors.contact}</p>}
            <label className={styles.messageField}>
              <span>お問い合わせ内容 <b>必須</b></span>
              <textarea name="message" rows={5} aria-invalid={Boolean(errors.message)} />
              {errors.message && <small className={styles.formError}>{errors.message}</small>}
            </label>
            <label className={styles.privacyConsent}>
              <input name="privacy" type="checkbox" value="agreed" />
              <span><a href="/privacy-policy">プライバシーポリシー</a>に同意のうえ、送信します。</span>
            </label>
            {errors.privacy && <p className={styles.formError}>{errors.privacy}</p>}
            <button className={styles.contactSubmit} type="submit" disabled={isSubmitting}>
              {isSubmitting ? '送信中...' : '相談内容を送信する'} <Arrow />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

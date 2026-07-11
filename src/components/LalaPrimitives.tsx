import styles from '../pages/Home.module.css';

export function Logo() {
  return (
    <span className={styles.logo} aria-label="LALA ララ株式会社">
      <span>LALA</span>
      <small>ララ株式会社</small>
    </span>
  );
}

export function Arrow() {
  return <span className={styles.arrow} aria-hidden="true">→</span>;
}

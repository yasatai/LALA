import type { services } from '../../data/lala';
import styles from '../../pages/Home.module.css';

type ServiceItem = (typeof services)[number];

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className={styles.serviceCard}>
      <div className={styles.serviceCardShape}>
        <img
          className={styles.serviceCardImage}
          src={service.image}
          alt={`${service.title}のリフォームイメージ`}
          width="800"
          height="560"
          loading="lazy"
        />
        <span className={styles.serviceCardOverlay} aria-hidden="true" />
        <div className={styles.serviceCardContent}>
          <span className={styles.serviceCardNumber}>{service.number}</span>
          <span className={styles.serviceCardLine} aria-hidden="true" />
          <h3>{service.title}</h3>
          <p>{service.text}</p>
        </div>
      </div>
      <a href={`/services#service-${service.number}`} aria-label={`${service.title}の詳細を見る`}>→</a>
    </article>
  );
}

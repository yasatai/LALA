import type { services } from '../../data/lala';
import styles from '../../pages/Home.module.css';

type ServiceItem = (typeof services)[number];

interface ServiceCardProps {
  service: ServiceItem;
  motionOrder: number;
}

export function ServiceCard({ service, motionOrder }: ServiceCardProps) {
  const optimizedImage = service.image.replace(/\.webp$/, '-960.webp');

  return (
    <article data-motion-item data-motion-order={motionOrder} className={styles.serviceCard}>
      <div className={styles.serviceCardShape}>
        <img
          className={styles.serviceCardImage}
          src={service.image}
          srcSet={`${optimizedImage} 960w`}
          sizes="(max-width: 767px) calc(100vw - 40px), 33vw"
          alt={`${service.title}のリフォームイメージ`}
          width="800"
          height="560"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <span className={styles.serviceCardOverlay} aria-hidden="true" />
        <div className={styles.serviceCardContent}>
          <span className={styles.serviceCardNumber}>{service.number}</span>
          <span className={styles.serviceCardLine} aria-hidden="true" />
          <h3>{service.title}</h3>
          <p>
            {service.descriptionLines.map((line) => (
              <span className={styles.serviceCardDescriptionLine} key={line}>{line}</span>
            ))}
          </p>
        </div>
      </div>
      <a href={`/services#service-${service.number}`} aria-label={`${service.title}の詳細を見る`}>→</a>
    </article>
  );
}

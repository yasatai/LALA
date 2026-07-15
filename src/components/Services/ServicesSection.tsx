import { services } from '../../data/lala';
import { withBase } from '../../lib/basePath';
import { gluePhrases } from '../../lib/jaText';
import { Arrow } from '../LalaPrimitives';
import { ServiceCard } from './ServiceCard';
import styles from '../../pages/Home.module.css';

export function ServicesSection() {
  const serviceRows = [services.slice(0, 3), services.slice(3, 6)];

  return (
    <section id="services" data-motion-group="services" className={`${styles.section} ${styles.services}`} aria-labelledby="services-title">
      <div className={styles.servicesInner}>
        <div data-motion-item data-motion-order="0" className={styles.sectionHead}>
          <div className={styles.serviceHeading}>
            <span>Services</span>
            <h2 id="services-title">{gluePhrases('サービス', 'メニュー')}</h2>
          </div>
          <a href={withBase('/services')}>すべてのサービスを見る <Arrow /></a>
        </div>
        <div className={styles.serviceMosaic}>
          {serviceRows.map((row, rowIndex) => (
            <div className={styles.serviceRow} key={`service-row-${rowIndex + 1}`}>
              {row.map((service, cardIndex) => (
                <ServiceCard key={service.number} service={service} motionOrder={(rowIndex * 3) + cardIndex + 1} />
              ))}
              <span className={`${styles.serviceSeam} ${styles.serviceSeamFirst}`} aria-hidden="true" />
              <span className={`${styles.serviceSeam} ${styles.serviceSeamSecond}`} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { services } from '../../data/lala';
import { Arrow } from '../LalaPrimitives';
import { ServiceCard } from './ServiceCard';
import styles from '../../pages/Home.module.css';

export function ServicesSection() {
  const serviceRows = [services.slice(0, 3), services.slice(3, 6)];

  return (
    <section id="services" className={`${styles.section} ${styles.services}`} aria-labelledby="services-title">
      <div className={styles.servicesInner}>
        <div className={styles.sectionHead}>
          <div className={styles.serviceHeading}>
            <span>Services</span>
            <h2 id="services-title">サービスメニュー</h2>
          </div>
          <a href="/services">すべてのサービスを見る <Arrow /></a>
        </div>
        <div className={styles.serviceMosaic}>
          {serviceRows.map((row, index) => (
            <div className={styles.serviceRow} key={`service-row-${index + 1}`}>
              {row.map((service) => (
                <ServiceCard key={service.number} service={service} />
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

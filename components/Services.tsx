import { services } from '@/constants/constants';
import styles from '@/styles/Services.module.css';

import Card from './Card';
import SectionTitle from './SectionTitle';

const Services = () => {
  return (
    <div>
      <SectionTitle title="Services" />
      <div className={styles.cardContainer}>
        {services.map((service) => {
          return (
            <div key={service.id}>
              <Card
                icon={service.icon}
                title={service.name}
                describedServices={service.services}
                colors={service.backgroundColors} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;

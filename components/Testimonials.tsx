import styles from '@/styles/Testimonials.module.css';

import SectionTitle from './SectionTitle';
import Carousel from './Carousel';

const Testimonials = () => {
  return (
    <div className={styles.testimonialsContainer}>
      <SectionTitle title="What clients say" />
      <Carousel />
    </div>
  );
};

export default Testimonials;

/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/Testimonials.module.css';

import { reviews } from '@/constants/constants';

const Carousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <Slider
        dots
        infinite
        className="testimonials-carousel"
        speed={700}
        slidesToShow={1}
        slidesToScroll={1}>
        {reviews.map((review) => {
          return (
            <div key={review.id}>
              <h3 className={styles.smallTitle}>{review.text}</h3>
              <p>{review.name}</p>
              <p>{review.date}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;

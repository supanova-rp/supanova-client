
import { Leckerli_One } from '@next/font/google';
import styles from '@/styles/PageHero.module.css';

const titleFont = Leckerli_One({
  weight: '400',
  subsets: ['latin'],
});

const PageHero = () => {
  return (
    <div className={styles.pageHeroContainer}>
      <div className={styles.titleContainer}>
        <h1 className={titleFont.className}>Web & Mobile Development</h1>
        <svg data-v-31b63a7b="" data-v-900adc3c="" width="87" height="10" viewBox="0 0 87 10" version="1" xmlns="http://www.w3.org/2000/svg">
          <path data-v-31b63a7b="" d="M0 2c7 0 7 6 14 6 8 0 8-6 15-6s7 6 15 6c7 0 7-6 14-6s7 6 14 6c8 0 8-6 15-6" strokeWidth="4" fill="none" fillRule="evenodd" className="wavyLineBreak" />
        </svg>
      </div>
      <p>We build your ideas for web and mobile applications.</p>
      <p>We have a huge passion for web and mobile development and have experience building complex apps. This enables us to produce high performance platforms, both from a front-end, customer facing point of view and from a back-end point of view.</p>
    </div>
  );
};

export default PageHero;

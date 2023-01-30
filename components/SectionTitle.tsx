import styles from '@/styles/SectionTitle.module.css';

interface Props {
  title: string,
}

const SectionTitle: React.FC<Props> = ({ title}) => {
  return (
    <div className={styles.sectionTitleContainer}>
      <svg data-v-31b63a7b="" data-v-900adc3c="" width="87" height="10" viewBox="0 0 87 10" version="1" xmlns="http://www.w3.org/2000/svg"><path data-v-31b63a7b="" d="M0 2c7 0 7 6 14 6 8 0 8-6 15-6s7 6 15 6c7 0 7-6 14-6s7 6 14 6c8 0 8-6 15-6" strokeWidth="4" fill="none" fillRule="evenodd" className="wavyLineBreak"></path></svg>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <svg data-v-31b63a7b="" data-v-900adc3c="" width="87" height="10" viewBox="0 0 87 10" version="1" xmlns="http://www.w3.org/2000/svg"><path data-v-31b63a7b="" d="M0 2c7 0 7 6 14 6 8 0 8-6 15-6s7 6 15 6c7 0 7-6 14-6s7 6 14 6c8 0 8-6 15-6" strokeWidth="4" fill="none" fillRule="evenodd" className="wavyLineBreak"></path></svg>
    </div>
  );
};

export default SectionTitle;

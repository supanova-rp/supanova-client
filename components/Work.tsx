import styles from '@/styles/Work.module.css';
import Project from './Project';
import SectionTitle from './SectionTitle';

const Work = () => {
  return (
    <div className={styles.workContainer}>
      <SectionTitle title="Featured projects" />
      <div className={styles.projectsGrid}>
        <Project title="Supanova" year={2023} link="" />
        <Project title="Tofu Together" year={2022} link="" />
        <Project title="Biggens" year={2023} link="" />
      </div>
    </div>
  );
};

export default Work;

import Link from 'next/link'

import styles from '@/styles/Work.module.css'

interface Props {
  title: string,
  year: number,
  link: string
}

const Project: React.FC<Props> = ({ title, year, link }) => {
  return (
    <Link href={link} className={styles.projectContainer}>
      <p className={styles.smallTitle}>{title}</p>
      <p className={styles.smallTitle}>{year}</p>
    </Link>
      
  );
};

export default Project;

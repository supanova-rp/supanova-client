import { Leckerli_One } from '@next/font/google';

import styles from '@/styles/Navbar.module.css';
import FlamingoIcon from '@/images/Flamingo.svg';

const logoFont = Leckerli_One({
  weight: '400',
  subsets: ['latin'],
});

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <a href="/" className={`${logoFont.className} ${styles.logo}`}>Flamingo</a>
        <div className={styles.contactUsContainer}>
          <FlamingoIcon fill="#f08182" height={35} width={35} />
          <a href="/" className={`${styles.contactUs}`}>Contact us</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

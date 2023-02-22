/* eslint-disable max-len */
import Image from 'next/image';

import InstructorImage from '@/images/Joel-profile.png';
import { LogoutErrorProps } from '@/index';
import Header from './Header';

const Instructor: React.FC<LogoutErrorProps> = ({ logoutError }) => {
  return (
    <div className="p-4 instructor-container">
      <Header title="Meet Your Instructor" logoutError={logoutError} />
      <div className="d-flex align-items-center">
        <Image src={InstructorImage} alt="Instructor" className="instructor-image" />
        <p className="m-0 p-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. </p>
      </div>
    </div>
  );
};

export default Instructor;

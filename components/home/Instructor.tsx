/* eslint-disable max-len */
import Image from 'next/image'

import InstructorImage from '@/images/Joel-profile.png';
import Header from './Header';

interface Props {
  logoutError: string,
}

const Instructor: React.FC<Props> = ({ logoutError }) => {
  return ( 
    // TODO: change this
    <div style={{width: '1000px'}} className="align-start">
      <Header title="Meet Your Instructor" logoutError={logoutError} />
      <div className="d-flex align-items-center instructor-content-container">
        <Image src={InstructorImage} alt="Instructor" width="110" height="100" className="instructor-image" />
        <p className="m-0 p-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. </p>
      </div>
    </div>
   );
}
 
export default Instructor;
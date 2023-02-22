import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { usePrivateRoute } from '@/hooks/usePrivateRoute';
import { API_DOMAIN } from '@/constants/constants';
import { Course } from '@/index';

import SidebarContainer from '@/components/home/SidebarContainer';
import NavbarHome from '@/components/home/Navbar';
import Instructor from '@/components/home/Instructor';
import Courses from '@/components/home/Courses';

export const getServerSideProps = async () => {
  const response = await fetch(`${API_DOMAIN}/courses`);

  const courseResults = await response.json();

  return {
    props: {
      courses: courseResults,
    },
  };
};

interface Props {
  courses: Course[],
}

const Home: React.FC<Props> = ({ courses }) => {
  const [logoutError, setLogoutError] = useState('');
  const [activeTab, setActiveTab] = useState('Courses');

  const { currentUser } = useAuth();

  // TODO: change this with middleware?
  usePrivateRoute();

  const renderAdminContent = () => {
    if (activeTab === 'Courses') {
      return <Courses logoutError={logoutError} courses={courses} />;
    }

    if (activeTab === 'Instructor') {
      return <Instructor logoutError={logoutError} />;
    }

    return null;
  };

  return (
    <div className="home-container">
      <NavbarHome setLogoutError={setLogoutError} />
      <div className="d-flex h-100 w-100">
        <SidebarContainer activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="px-5 w-100 min-vh-100">
          {renderAdminContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;

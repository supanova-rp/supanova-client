import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { usePrivateRoute } from '@/hooks/usePrivateRoute';

import SidebarContainer from '@/components/home/SidebarContainer';
import NavbarHome from '@/components/home/Navbar';
import Courses from '@/components/home/Courses';
import Instructor from '@/components/home/Instructor';

const Home = () => {
  const [logoutError, setLogoutError] = useState('');
  const [activeTab, setActiveTab] = useState('Curriculum')

  const { currentUser } = useAuth();

  // TODO: change this with middleware?
  usePrivateRoute();

   const renderAdminContent = () => {
    if (activeTab === 'Curriculum') {
      return <Courses logoutError={logoutError} />;
    }

    if (activeTab === 'Instructor') {
      return <Instructor logoutError={logoutError} />;
    }

    return null;
  };

  return (
    <>
      <NavbarHome setLogoutError={setLogoutError} />
      <div className="d-flex h-100">
        <SidebarContainer activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderAdminContent()}
      </div>  
    </>
  );
};

export default Home;

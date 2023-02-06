import { useState } from 'react';

import AddCourses from '@/components/admin/AddCourses';
import AddUsers from '@/components/admin/AddUsers';
import SidebarContainer from '@/components/admin/SidebarContainer';
import ModifyCourses from '@/components/admin/ModifyCourses';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('New Courses');

  const renderAdminContent = () => {
    if (activeTab === 'New Courses') {
      return <AddCourses />;
    }

    if (activeTab === 'Existing Courses') {
      return <ModifyCourses />;
    }

    if (activeTab === 'New Users') {
      return <AddUsers />;
    }

    return null;
  };

  return (
    <div className="d-flex h-100">
      <SidebarContainer activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderAdminContent()}
    </div>
  );
};

export default Admin;

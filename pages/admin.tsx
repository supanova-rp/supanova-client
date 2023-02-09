import { useState } from 'react';

import AddCourses from '@/components/admin/AddCourses';
import AddUsers from '@/components/admin/AddUsers';
import SidebarContainer from '@/components/admin/SidebarContainer';
import EditCourses from '@/components/admin/EditCourses';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('New Courses');

  const renderAdminContent = () => {
    if (activeTab === 'New Courses') {
      return <AddCourses />;
    }

    if (activeTab === 'Existing Courses') {
      return <EditCourses />;
    }

    if (activeTab === 'New Users') {
      return <AddUsers />;
    }

    return null;
  };

  return (
    <div className="d-flex admin-container">
      <SidebarContainer activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderAdminContent()}
    </div>
  );
};

export default Admin;

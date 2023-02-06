import { useState } from 'react';

import AddCourses from '@/components/admin/AddCourses';
import AddUsers from '@/components/admin/AddUsers';
import SidebarContainer from '@/components/admin/SidebarContainer';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('Courses');

  const renderAdminContent = () => {
    if (activeTab === 'Courses') {
      return <AddCourses />;
    }

    if (activeTab === 'Users') {
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

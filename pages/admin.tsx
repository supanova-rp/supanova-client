import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';

import AddCourses from '@/components/admin/AddCourses';
import AddUsers from '@/components/admin/AddUsers';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const renderAdminContent = () => {
    if (activeTab === 'courses') {
      return <AddCourses />;
    }

    if (activeTab === 'users') {
      return <AddUsers />;
    }

    return null;
  };

  return (
    <div className="d-flex h-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderAdminContent()}
    </div>
  );
};

export default Admin;

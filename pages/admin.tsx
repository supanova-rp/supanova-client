import { useState } from 'react';

import { API_DOMAIN } from '@/constants/constants';
import { Course } from '@/index';
import { useRefreshData } from '@/hooks/useRefreshData';

import AddCourses from '@/components/admin/new-courses/NewCourses';
import AddUsers from '@/components/admin/add-users/AddUsers';
import SidebarContainer from '@/components/admin/nav-and-sidebars/SidebarContainer';
import EditCourses from '@/components/admin/edit-courses/ExistingCourses';

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

const Admin: React.FC<Props> = ({ courses }) => {
  const [activeTab, setActiveTab] = useState('Add Course');

  const refreshData = useRefreshData();

  const renderAdminContent = () => {
    if (activeTab === 'Add Course') {
      return <AddCourses refreshData={refreshData} />;
    }

    if (activeTab === 'Edit Courses') {
      return (
        <EditCourses
          courses={courses}
          refreshData={refreshData} />
      );
    }

    if (activeTab === 'Add Users') {
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

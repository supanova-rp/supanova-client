import { useState } from 'react';

import { API_DOMAIN } from '@/constants/constants';
import { ServerSideCourses } from '@/index';

import AddCourses from '@/components/admin/add-course/AddCourses';
import AddUsers from '@/components/admin/add-users/AddUsers';
import SidebarContainer from '@/components/admin/nav-and-sidebars/SidebarContainer';
import EditCourses from '@/components/admin/edit-courses/EditCourses';

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
  courses: ServerSideCourses,
}

const Admin: React.FC<Props> = ({ courses }) => {
  const [activeTab, setActiveTab] = useState('New Courses');

  const renderAdminContent = () => {
    if (activeTab === 'New Courses') {
      return <AddCourses />;
    }

    if (activeTab === 'Existing Courses') {
      return <EditCourses courses={courses} />;
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

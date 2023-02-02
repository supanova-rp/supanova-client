import Sidebar from '@/components/admin/Sidebar';

import AddCourses from './add-courses';
// import AddUsers from './add-users';

const Admin = () => {
  // const [activeTab, setActiveTab] 'users'

  return (
    <div className="d-flex h-100">
      <Sidebar />
      <AddCourses />
      {/* <AddUsers /> */}
    </div>
  );
};

export default Admin;

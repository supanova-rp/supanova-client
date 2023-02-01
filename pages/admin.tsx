import Sidebar from '@/components/admin/Sidebar';

import AddCourses from './add-courses';

const Admin = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100%' }}>
      <Sidebar />
      <AddCourses />
    </div>
  );
};

export default Admin;

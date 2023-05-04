import { useState } from "react";

import { ADMINS_TABS } from "src/constants/constants";

import AddCourse from "./add-course/AddCourse";
import AddUsers from "./add-users/AddUsers";
import SidebarContainer from "./nav-and-sidebars/SidebarContainer";
import EditCourses from "./edit-courses/EditCourses";

const { ADD_COURSE, ADD_USERS, EDIT_COURSES } = ADMINS_TABS;

const Admin = () => {
  const [activeTab, setActiveTab] = useState(ADD_COURSE);

  const renderAdminContent = () => {
    if (activeTab === ADD_COURSE) {
      return <AddCourse />;
    }

    if (activeTab === EDIT_COURSES) {
      return <EditCourses />;
    }

    if (activeTab === ADD_USERS) {
      return <AddUsers />;
    }

    return null;
  };

  return (
    <div className="d-flex admin-container">
      <SidebarContainer
        activeTab={activeTab}
        setActiveTab={setActiveTab} />
      {renderAdminContent()}
    </div>
  );
};

export default Admin;

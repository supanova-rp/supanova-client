import { useState } from "react";

import AddCourses from "./new-courses/NewCourses";
import AddUsers from "./add-users/AddUsers";
import SidebarContainer from "./nav-and-sidebars/SidebarContainer";
import EditCourses from "./edit-courses/ExistingCourses";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Add Course");

  const renderAdminContent = () => {
    if (activeTab === "Add Course") {
      return <AddCourses />;
    }

    if (activeTab === "Edit Courses") {
      return (
        <EditCourses/>
      );
    }

    if (activeTab === "Add Users") {
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

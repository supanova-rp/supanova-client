import { useState } from "react";
import { Card } from "react-bootstrap";

import { ADMINS_TABS } from "src/constants/constants";
import { AdminTabValue } from "src/types";

import AddCourse from "./add-course/AddCourse";
import AddUsers from "./add-users/AddUsers";
import AdminSidebarContainer from "./sidebar/AdminSidebarContainer";
import EditCourses from "./edit-courses/EditCourses";
import AssignUsers from "./assign-users/AssignUsers";
import BottomMobileNavbar from "../nav/BottomMobileNavbar";

const { ADD_COURSE, ADD_USERS, ASSIGN_USERS, EDIT_COURSES } = ADMINS_TABS;

const Admin = () => {
  const [activeTab, setActiveTab] = useState<AdminTabValue>(ADD_COURSE);

  const renderAdminContent = () => {
    if (activeTab === ADD_COURSE) {
      return <AddCourse />;
    }

    if (activeTab === EDIT_COURSES) {
      return <EditCourses />;
    }

    if (activeTab === ASSIGN_USERS) {
      return <AssignUsers />;
    }

    if (activeTab === ADD_USERS) {
      return <AddUsers />;
    }

    return null;
  };

  return (
    <div className="d-flex admin-container">
      <AdminSidebarContainer
        isAdminDashboard
        activeTab={activeTab}
        setActiveTab={setActiveTab} />
      <Card
        className="w-100 p-3 d-flex mh-100 rounded-0">
        <Card.Body>
          {renderAdminContent()}
        </Card.Body>
      </Card>
      <BottomMobileNavbar setActiveTab={setActiveTab} />
    </div>
  );
};

export default Admin;

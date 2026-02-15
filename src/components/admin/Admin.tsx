import { useState } from "react";
import { Card } from "react-bootstrap";
import { ADMINS_TABS } from "src/constants/constants";
import { AdminTabValue } from "src/types";

import AddCourse from "./add-course/AddCourse";
import AssignUsers from "./assign-users/AssignUsers";
import EditCourses from "./edit-courses/EditCourses";
import ProgressDashboard from "./progress/ProgressDashboard";
import { RegisterUser } from "./register-user/RegisterUser";
import AdminSidebarContainer from "./sidebar/AdminSidebarContainer";
import BottomMobileNavbar from "../nav/BottomMobileNavbar";

const { ADD_COURSE, ASSIGN_USERS, EDIT_COURSES, REGISTER_USER, USER_PROGRESS } =
  ADMINS_TABS;

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

    if (activeTab === REGISTER_USER) {
      return <RegisterUser />;
    }

    if (activeTab === USER_PROGRESS) {
      return <ProgressDashboard />;
    }

    return null;
  };

  return (
    <div className="d-flex admin-container">
      <AdminSidebarContainer
        isAdminDashboard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Card className="w-100 p-3 d-flex mh-100 rounded-0">
        <Card.Body>{renderAdminContent()}</Card.Body>
      </Card>
      <BottomMobileNavbar setActiveTab={setActiveTab} />
    </div>
  );
};

export default Admin;


import { useAuth } from "src/contexts/AuthContext";
import { CourseTabs } from "src/constants/constants";

import SidebarContainer from "../home/SidebarContainer";
import Navbar from "../nav/Navbar";
import Instructor from "../home/Instructor";

import { useAppContext } from "src/contexts/AppContext";
import CoursesDashboard from "./CoursesDashboard";

export const DashboardContainer = () => {
  const { isAdmin } = useAuth();
  const { activeTab } = useAppContext();

  const renderTabContent = () => {
    if (activeTab === CourseTabs.Courses) {
      return <CoursesDashboard />;
    }

    if (activeTab === CourseTabs.Instructor) {
      return <Instructor />;
    }

    return null;
  };

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <div className="course-container">
        <SidebarContainer />
        <div
          className="course-content-container"
          style={{ boxShadow: "inset 1px 0px 5px 0px hsl(228deg 66% 45% / 15%)" }}>
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

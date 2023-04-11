import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

import { API_DOMAIN } from "../../constants/constants";

import SidebarContainer from "./SidebarContainer";
import NavbarHome from "./Navbar";
import Instructor from "./Instructor";
import Courses from "./Courses";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [logoutError, setLogoutError] = useState("");
  const [activeTab, setActiveTab] = useState("Courses");

  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch(`${API_DOMAIN}/courses`)
      const courseResults = await response.json()

      setCourses(courseResults)
    }

    getCourses();
  }, [])

  const renderAdminContent = () => {
    if (!courses.length) {
      return <Alert variant="warning" className="mt-4">No courses to see yet...</Alert>;
    }

    if (activeTab === "Courses") {
      return <Courses logoutError={logoutError} courses={courses} />;
    }

    if (activeTab === "Instructor") {
      return <Instructor logoutError={logoutError} />;
    }

    return null;
  };

  return (
    <div className="home-container">
      <NavbarHome setLogoutError={setLogoutError} />
      <div className="d-flex h-100 w-100">
        <SidebarContainer activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="px-5 w-100 min-vh-100">
          {renderAdminContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;

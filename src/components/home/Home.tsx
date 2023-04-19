import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { PulseLoader } from "react-spinners";

import { API_DOMAIN } from "../../constants/constants";
import { colors } from "src/constants/colorPalette";
import { Course } from "src/types";

import SidebarContainer from "./SidebarContainer";
import NavbarHome from "./Navbar";
import Instructor from "./Instructor";
import Courses from "./Courses";

const Home = () => {
  const [courses, setCourses] = useState<[] | Course[]>([]);
  const [logoutError, setLogoutError] = useState<null | string>(null);
  const [activeTab, setActiveTab] = useState<string>("Courses");
  const [coursesError, setCoursesError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCourses = async () => {
    setIsLoading(true)
    setCoursesError(null)

    try {
      const response = await fetch(`${API_DOMAIN}/courses`)
      const courseResults = await response.json()

      setCourses(courseResults)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
      setCoursesError("Loading courses failed.")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCourses();
  }, [])

  const renderAdminContent = () => {
    if (coursesError) {
      return (
        <div className="mt-4">
          <Alert variant="danger">{coursesError}</Alert>
          <Button className="main-button" onClick={getCourses}>Try again</Button>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center pb-5">
          <PulseLoader color={colors.orange} className="m-5" />
        </div>
      )
    }

    if (!courses.length) {
      return <Alert variant="warning" className="mt-4">No courses to see yet...</Alert>;
    }

    if (activeTab === "Courses") {
      return <Courses logoutError={logoutError} courses={courses} setCourses={setCourses} />;
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

import { useEffect, useState } from "react";

import { Course } from "src/types";
import { getRequest } from "src/utils/utils";

import SidebarContainer from "./SidebarContainer";
import NavbarHome from "./Navbar";
import Instructor from "./Instructor";
import Courses from "./Courses";
import CourseErrorLoadingHandler from "../CourseErrorLoadingHandler";

const Home = () => {
  const [courses, setCourses] = useState<[] | Course[]>([]);
  const [logoutError, setLogoutError] = useState<null | string>(null);
  const [activeTab, setActiveTab] = useState<string>("Courses");
  const [coursesError, setCoursesError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCourses = async () => {
    setIsLoading(true);
    setCoursesError(null);

     getRequest({
      endpoint: "/courses",
      onSuccess,
      onError: (error) => onError("Loading courses failed", error),
    });
  };

  useEffect(() => {
    getCourses();
  }, []);

  const onSuccess = (result: Course[]) => {
    setIsLoading(false);
    setCourses(result);
  };

  const onError = (courseErrorMessage: string, error = "") => {
    console.log(">>> error: ", error || courseErrorMessage);

    setIsLoading(false);
    setCoursesError(courseErrorMessage);
  };

  const renderAdminContent = () => {
    if (activeTab === "Courses") {
      return <Courses
        logoutError={logoutError}
        courses={courses}
        setCourses={setCourses} />;
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
        <SidebarContainer
          activeTab={activeTab}
          setActiveTab={setActiveTab} />
        <div className="px-5 w-100 min-vh-100">
          <CourseErrorLoadingHandler
            error={coursesError}
            onClick={getCourses}
            isLoading={isLoading}
            courses={courses}>
            {renderAdminContent()}
          </CourseErrorLoadingHandler>

        </div>
      </div>
    </div>
  );
};

export default Home;

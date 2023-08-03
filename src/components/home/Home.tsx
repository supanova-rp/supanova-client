import { useEffect, useState } from "react";

import { Course } from "src/types";
import { useAuth } from "src/contexts/AuthContext";

import SidebarContainer from "./SidebarContainer";
import Navbar from "../nav/Navbar";
import Instructor from "./Instructor";
import Courses from "./Courses";
import CourseErrorLoadingHandler from "../CourseErrorLoadingHandler";
import useRequest from "src/hooks/useRequest";
import { HOME_TABS } from "src/constants/constants";

const Home = () => {
  const [courses, setCourses] = useState<[] | Course[]>([]);
  const [logoutError, setLogoutError] = useState<null | string>(null);
  const [activeTab, setActiveTab] = useState<string>("Courses");
  const [coursesError, setCoursesError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { COURSES, INSTRUCTOR } = HOME_TABS;

  const { getIsAdmin } = useAuth();

  const requestCourses = useRequest("/courses");

  const getCourses = () => {
    setIsLoading(true);
    setCoursesError(null);

    requestCourses({
      onSuccess,
      onError: (error) => onError("Loading courses failed", error),
    });
  };

  const verifyIsAdmin = async () => {
    try {
      const result = await getIsAdmin();

      setIsAdmin(result);
    } catch (e) {
      console.log(">>> isAdminError: ", e);
    }
  };

  useEffect(() => {
    verifyIsAdmin();
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

  const renderTabContent = () => {
    if (activeTab === COURSES) {
      return (
        <CourseErrorLoadingHandler
          error={coursesError}
          onClick={getCourses}
          isLoading={isLoading}
          courses={courses}>
          <Courses
            logoutError={logoutError}
            courses={courses}
            setCourses={setCourses} />
        </CourseErrorLoadingHandler>
      );
    }

    if (activeTab === INSTRUCTOR) {
      return <Instructor logoutError={logoutError} />;
    }

    return null;
  };

  return (
    <div className="home-container">
      <Navbar
        setLogoutError={setLogoutError}
        isAdmin={isAdmin} />
      <div className="d-flex h-100 w-100">
        <SidebarContainer
          activeTab={activeTab}
          setActiveTab={setActiveTab} />
        <div className="px-5 w-100 min-vh-100">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;

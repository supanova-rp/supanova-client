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
import Header from "./Header";

const Home = () => {
  const [courses, setCourses] = useState<[] | Course[]>([]);
  const [logoutError, setLogoutError] = useState<null | string>(null);
  const [activeTab, setActiveTab] = useState<string>("Courses");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { COURSES, INSTRUCTOR } = HOME_TABS;

  const { getIsAdmin, currentUser } = useAuth();

  const requestAllCourses = useRequest("/courses");
  const requestAssignedCourses = useRequest("/assigned-courses");

  const getCourses = (isAnAdmin: boolean) => {
    setIsLoading(true);
    setError(null);

    if (isAnAdmin) {
      requestAllCourses({
        onSuccess,
        onError: (error) => onError(error, "Failed to load courses."),
      });
    } else {
      requestAssignedCourses({
        requestBody: {
          user_id: currentUser?.uid
        },
        onSuccess,
        onError: (error) => onError(error, "Failed to load courses.")
      });
    }
  };

  const verifyIsAdmin = async () => {
    try {
      const result = await getIsAdmin();

      setIsAdmin(result);
      getCourses(result);
    } catch (error) {
      onError("Failed to load courses.", error as string);
    }
  };

  useEffect(() => {
    verifyIsAdmin();
  }, []);

  const onSuccess = (result: Course[]) => {
    setCourses(result);
    setIsLoading(false);
  };

  const onError = (error = "", courseErrorMessage: string ) => {
    console.log(">>> error: ", error || courseErrorMessage);

    setIsLoading(false);
    setError(courseErrorMessage);
  };

  const renderTabContent = () => {
    if (activeTab === COURSES) {
      return (
        <div>
          <Header
            title="Course Curriculum"
            logoutError={logoutError} />

          <CourseErrorLoadingHandler
            error={error}
            onClick={() => getCourses(isAdmin)}
            isLoading={isLoading}
            courses={courses}>
            <Courses
              logoutError={logoutError}
              courses={courses}
              setCourses={setCourses} />
          </CourseErrorLoadingHandler>
        </div>
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
        <div
          className="px-5 w-100 min-vh-100"
          style={{ boxShadow: "inset 1px 0px 5px 0px hsl(228deg 66% 45% / 15%)" }}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;

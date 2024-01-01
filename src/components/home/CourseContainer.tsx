import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { AdminTabValue, Course as CourseType } from "src/types";
import useRequest from "src/hooks/useRequest";
import { useAuth } from "src/contexts/AuthContext";
import { COURSE_TABS, feedbackMessages } from "src/constants/constants";

import SidebarContainer from "./SidebarContainer";
import Navbar from "../nav/Navbar";
import Instructor from "./Instructor";
import Course from "./Course";

import CourseErrorLoadingHandler from "../CourseErrorLoadingHandler";

const CourseContainer = () => {
  const [course, setCourse] = useState<null | CourseType>(null);
  const [activeTab, setActiveTab] = useState<AdminTabValue>("Courses");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { COURSES, INSTRUCTOR } = COURSE_TABS;
  const { getIsAdmin } = useAuth();

  const { id } = useParams();

  // TODO: get the entire course here
  const requestCourse = useRequest("/course");

  const getCourse = () => {
    setIsLoading(true);
    setError(null);

    requestCourse({
      requestBody: {
        courseId: id,
      },
      onSuccess,
      onError: (error) => onError(error, feedbackMessages.getCourseError)
    });
  };

  const verifyIsAdmin = async () => {
    try {
      const result = await getIsAdmin();

      setIsAdmin(result);
      getCourse();
    } catch (error) {
      onError(feedbackMessages.adminVerificationError, error as string);
    }
  };

  useEffect(() => {
    verifyIsAdmin();
  }, []);

  const onSuccess = (result: CourseType) => {
    setCourse(result);
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
          <CourseErrorLoadingHandler
            error={error}
            onClick={getCourse}
            isLoading={isLoading}
            course={course}>
            <Course
              course={course}
              setCourse={setCourse} />
          </CourseErrorLoadingHandler>
        </div>
      );
    }

    if (activeTab === INSTRUCTOR) {
      return <Instructor />;
    }

    return null;
  };

  return (
    <>
      <Navbar
        isAdmin={isAdmin} />
      <div className="course-container">
        <SidebarContainer
          activeTab={activeTab}
          setActiveTab={setActiveTab} />
        <div
          className="course-content-container"
          style={{ boxShadow: "inset 1px 0px 5px 0px hsl(228deg 66% 45% / 15%)" }}>
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default CourseContainer;

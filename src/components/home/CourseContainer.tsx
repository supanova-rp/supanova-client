import { useParams } from "react-router-dom";
import { useState } from "react";

import { AdminTabValue, Course as CourseType } from "src/types";
import { useAuth } from "src/contexts/AuthContext";
import { COURSE_TABS, feedbackMessages } from "src/constants/constants";

import SidebarContainer from "./SidebarContainer";
import Navbar from "../nav/Navbar";
import Instructor from "./Instructor";
import Course from "./Course";

import RequestHandler from "../RequestHandler";
import { useQuery } from "src/hooks/useQuery";

const CourseContainer = () => {
  const [activeTab, setActiveTab] = useState<AdminTabValue>("Courses");

  const { COURSES, INSTRUCTOR } = COURSE_TABS;
  const { isAdmin } = useAuth();

  const { id } = useParams();

  const { data: course, loading, error, refetch } = useQuery<CourseType>("/course", {
    requestBody: {
      courseId: id,
    },
    defaultError: feedbackMessages.getCourseError
  });

  const renderTabContent = () => {
    console.log(">>>> course: ", course);

    if (activeTab === COURSES) {
      return (
        <RequestHandler
          error={error}
          onClick={refetch}
          isLoading={loading}
          shouldShowWarning={!course}
          warningMessage={feedbackMessages.getCourseError}>
          {course
            ? <Course course={course} />
            : null
          }

        </RequestHandler>
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

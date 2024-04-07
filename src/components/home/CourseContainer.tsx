import { useParams } from "react-router-dom";

import { Course as CourseType } from "src/types";
import { useAuth } from "src/contexts/AuthContext";
import { feedbackMessages } from "src/constants/constants";

import SidebarContainer from "./SidebarContainer";
import Navbar from "../nav/Navbar";
import Course from "./Course";

import RequestHandler from "../RequestHandler";
import { useQuery } from "src/hooks/useQuery";

const CourseContainer = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();

  const { data: course, loading, error, refetch } = useQuery<CourseType>("/course", {
    requestBody: {
      courseId: id,
    },
    defaultError: feedbackMessages.getCourseError
  });

  return (
    <>
      <Navbar
        isAdmin={isAdmin} />
      <div className="course-container">
        <SidebarContainer />
        <div
          className="course-content-container"
          style={{ boxShadow: "inset 1px 0px 5px 0px hsl(228deg 66% 45% / 15%)" }}>
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
        </div>
      </div>
    </>
  );
};

export default CourseContainer;

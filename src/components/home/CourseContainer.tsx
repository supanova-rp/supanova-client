import { useParams } from "react-router-dom";
import { feedbackMessages } from "src/constants/constants";
import { useAuth } from "src/contexts/AuthContext";
import { useQuery } from "src/hooks/useQuery";
import { Course as CourseType, UserCourseProgress } from "src/types";

import Course from "./Course";
import SidebarContainer from "./SidebarContainer";
import Navbar from "../nav/Navbar";
import RequestHandler from "../RequestHandler";

const CourseContainer = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();

  const {
    data: course,
    loading: loadingCourse,
    error: courseError,
    refetch: refetchCourse,
  } = useQuery<CourseType>("/course", {
    requestBody: {
      courseId: id,
    },
    defaultError: feedbackMessages.getCourseError,
  });

  const {
    data: courseProgress,
    loading: loadingProgress,
    error: progressError,
    refetch: refetchProgress,
  } = useQuery<UserCourseProgress>("/get-progress", {
    requestBody: {
      courseId: id,
    },
    defaultError: feedbackMessages.getProgressError,
  });

  const refetchQueries = () => {
    refetchCourse();
    refetchProgress();
  };

  const loading = loadingProgress || loadingCourse;
  const error = courseError || progressError;

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <div className="course-container">
        <SidebarContainer />
        <div
          className="course-content-container"
          style={{
            boxShadow: "inset 1px 0px 5px 0px hsl(228deg 66% 45% / 15%)",
          }}
        >
          <RequestHandler
            error={error}
            onClick={refetchQueries}
            isLoading={loading}
          >
            {course && courseProgress ? (
              <Course
                course={course}
                courseProgress={courseProgress}
                refetchProgress={refetchProgress}
              />
            ) : null}
          </RequestHandler>
        </div>
      </div>
    </>
  );
};

export default CourseContainer;

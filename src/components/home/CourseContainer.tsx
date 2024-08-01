import { useParams } from "react-router-dom";
import { feedbackMessages } from "src/constants/constants";
import { useAuth } from "src/contexts/AuthContext";
import { useQuery } from "src/hooks/useQuery";
import { Course as CourseType } from "src/types";

import Course from "./Course";
import SidebarContainer from "./SidebarContainer";
import Navbar from "../nav/Navbar";
import RequestHandler from "../RequestHandler";

const CourseContainer = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();

  const {
    data: course,
    loading,
    error,
    refetch,
  } = useQuery<CourseType>("/course", {
    requestBody: {
      courseId: id,
    },
    defaultError: feedbackMessages.getCourseError,
  });

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
          <RequestHandler error={error} onClick={refetch} isLoading={loading}>
            {course ? <Course course={course} /> : null}
          </RequestHandler>
        </div>
      </div>
    </>
  );
};

export default CourseContainer;

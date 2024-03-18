import { useEffect, useState } from "react";

import { Course } from "src/types";
import useRequest from "src/hooks/useRequest";
import { useAuth } from "src/contexts/AuthContext";

import CourseCard from "./CourseCard";
import Navbar from "../nav/Navbar";
import RequestHandler from "../RequestHandler";

const CoursesDashboard = () => {
  const [courses, setCourses] = useState<[] | Course[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isAdmin, currentUser } = useAuth();

  const requestCourseTitles = useRequest("/course-titles");
  const requestAssignedCourseTitles = useRequest("/assigned-course-titles");

  const getCourses = () => {
    setIsLoading(true);
    setError(null);

    if (isAdmin) {
      requestCourseTitles({
        onSuccess,
        onError: (error) => onError(error, "Failed to load courses."),
      });
    } else {
      requestAssignedCourseTitles({
        requestBody: {
          user_id: currentUser?.uid
        },
        onSuccess,
        onError: (error) => onError(error, "Failed to load courses.")
      });
    }
  };

  // TODO: test gpt to make useQuery hook
  const handleGetCourses = async () => {
    try {
      getCourses();
    } catch (error) {
      onError("Failed to load courses.", error as string);
    }
  };

  useEffect(() => {
    handleGetCourses();
  }, []);

  const onSuccess = (result: Course[]) => {
    console.log(">>>> result: ", result);

    setCourses(result);
    setIsLoading(false);
  };

  const onError = (error = "", courseErrorMessage: string ) => {
    console.log(error || courseErrorMessage);

    setIsLoading(false);
    setError(courseErrorMessage);
  };

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <div className="courses-dashboard-container">
        <RequestHandler
          error={error}
          isCoursesDashboard
          onClick={handleGetCourses}
          isLoading={isLoading}
          shouldShowWarning={!courses?.length}
          warningMessage="You don't have any courses yet...">
          <div className="courses-dashboard-grid">
            {courses?.map((course) => {
              return (
                <CourseCard
                  key={course.id}
                  course={course} />
              );
            })}
          </div>
        </RequestHandler>
      </div>
    </>
  );
};

export default CoursesDashboard;
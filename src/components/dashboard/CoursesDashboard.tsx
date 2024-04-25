import { useEffect, useState } from "react";

import { Course } from "src/types";
import useRequest from "src/hooks/useRequest";
import { useAuth } from "src/contexts/AuthContext";

import CourseCard from "./CourseCard";
import RequestHandler from "../RequestHandler";
import Header from "../home/Header";

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
    setCourses(result);
    setIsLoading(false);
  };

  const onError = (error = "", courseErrorMessage: string ) => {
    console.log(error || courseErrorMessage);

    setIsLoading(false);
    setError(courseErrorMessage);
  };

  return (
    <div className="w-100">
      <Header
        className="default-header"
        title="Courses" />
      <RequestHandler
        error={error}
        isCoursesDashboard
        onClick={handleGetCourses}
        isLoading={isLoading}
        shouldShowWarning={!courses?.length}
        warningMessage="You don't have any courses yet...">
        <div className="courses-dashboard-grid pt-2">
          {courses?.map((course, index) => {
            return (
              <CourseCard
                key={course.id}
                course={course}
                index={index} />
            );
          })}
        </div>
      </RequestHandler>
    </div>
  );
};

export default CoursesDashboard;
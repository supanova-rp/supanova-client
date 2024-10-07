import { useEffect, useState } from "react";
import { useAuth } from "src/contexts/AuthContext";
import useRequest from "src/hooks/useRequest";
import { Course } from "src/types";

import CourseCard from "./CourseCard";
import Header from "../home/Header";
import RequestHandler from "../RequestHandler";

const CoursesDashboard = () => {
  const [courses, setCourses] = useState<[] | Course[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isAdmin } = useAuth();

  const requestCourseTitles = useRequest("/course-titles");
  const requestAssignedCourseTitles = useRequest("/assigned-course-titles");

  const onSuccess = (result: Course[]) => {
    setCourses(result);
    setIsLoading(false);
  };

  const onError = (err = "", courseErrorMessage: string = "") => {
    console.log(err || courseErrorMessage);

    setIsLoading(false);
    setError(courseErrorMessage);
  };

  const getCourses = () => {
    setIsLoading(true);
    setError(null);

    if (isAdmin) {
      requestCourseTitles({
        onSuccess,
        onError: err => onError(err, "Failed to load courses."),
      });
    } else {
      requestAssignedCourseTitles({
        onSuccess,
        onError: err => onError(err, "Failed to load courses."),
      });
    }
  };

  const handleGetCourses = async () => {
    try {
      getCourses();
    } catch (err) {
      onError("Failed to load courses.", err as string);
    }
  };

  useEffect(() => {
    handleGetCourses();
  }, []);

  return (
    <div className="w-100">
      <Header
        className="default-header"
        headerClassname="centered-header"
        title="Courses"
      />
      <RequestHandler
        error={error}
        isCoursesDashboard
        onClick={handleGetCourses}
        isLoading={isLoading}
        shouldShowWarning={!courses?.length}
        warningMessage="You don't have any courses yet..."
      >
        <div className="courses-dashboard-grid pt-2">
          {courses?.map((course, index) => {
            return <CourseCard key={course.id} course={course} index={index} />;
          })}
        </div>
      </RequestHandler>
    </div>
  );
};

export default CoursesDashboard;

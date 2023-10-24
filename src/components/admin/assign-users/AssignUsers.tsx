import { useEffect, useState } from "react";

import useRequest from "../../../hooks/useRequest";

import AdminHeader from "../AdminHeader";
import { CourseTitle, UserToCourses } from "src/types";
import CourseErrorLoadingHandler from "src/components/CourseErrorLoadingHandler";
import AssignUsersAccordion from "./AssignUsersAccordion";

const AssignUsers = () => {
  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(true);
  const [isLoadingUserCourses, setIsLoadingUserCourses] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [courses, setCourses] = useState<CourseTitle[]>([]);
  const [usersToCourses, setUsersToCourses] = useState<UserToCourses[]>([]);

  const requestCourseTitles = useRequest("/course-titles");
  const requestUsersToCourses = useRequest("/users-to-courses");

  const onError = (error: string, errorMessage: string) => {
    console.log(error);

    setIsLoadingCourses(false);
    setError(errorMessage);
  };

  const onSuccessUserCourses = (results: UserToCourses[]) => {
    setIsLoadingUserCourses(false);
    setUsersToCourses(results);
  };

  const onSuccessCourses = (result: CourseTitle[]) => {
    setCourses(result);
    setIsLoadingCourses(false);

    if (result.length) {
      getUsersWithAssignedCourses();
    }
  };

  const getCoursesAndUsers = () => {
    requestCourseTitles({
      onSuccess: onSuccessCourses,
      onError: (error) => onError(error, "Failed to load courses.")
    });

  };

  const getUsersWithAssignedCourses = () => {
    setIsLoadingUserCourses(true);

    requestUsersToCourses({
      onSuccess: onSuccessUserCourses,
      onError: (error) => onError(error, "Failed to load users.")
    });
  };

  useEffect(() => {
    getCoursesAndUsers();
  }, []);

  return (
    <>
      <AdminHeader title="Assign Users to Courses" />
      <CourseErrorLoadingHandler
        error={error}
        courses={courses}
        onClick={getCoursesAndUsers}
        isLoading={isLoadingCourses || isLoadingUserCourses}
        usersToCourses={usersToCourses}>
        <AssignUsersAccordion
          usersToCourses={usersToCourses}
          courses={courses}
          setUsersToCourses={setUsersToCourses}/>
      </CourseErrorLoadingHandler>
    </>
  );
};

export default AssignUsers;
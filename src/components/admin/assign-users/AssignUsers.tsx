import { useEffect, useState } from "react";

import useRequest from "../../../hooks/useRequest";

import AdminHeader from "../AdminHeader";
import { CourseTitle, UserToCourses } from "src/types";
import RequestHandler from "src/components/RequestHandler";
import AssignUsersAccordion from "./AssignUsersAccordion";

const AssignUsers = () => {
  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(true);
  const [isLoadingUserCourses, setIsLoadingUserCourses] = useState<boolean>(false);
  const [coursesError, setCoursesError] = useState<null | string>(null);
  const [userCoursesError, setUserCoursesError] = useState<null | string>(null);
  const [courses, setCourses] = useState<CourseTitle[]>([]);
  const [usersToCourses, setUsersToCourses] = useState<UserToCourses[]>([]);

  const requestCourseTitles = useRequest("/course-titles");
  const requestUsersToCourses = useRequest("/users-to-courses");

  // TODO: extract this to a hook that returns error and loading state
  const onCoursesError = (error: string, errorMessage: string) => {
    console.log(error);

    setIsLoadingCourses(false);
    setCoursesError(errorMessage);
  };

  const onUserCoursesError = (error: string, errorMessage: string) => {
    console.log(error);

    setIsLoadingUserCourses(false);
    setUserCoursesError(errorMessage);
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

  const getCourseTitles = () => {
    requestCourseTitles({
      onSuccess: onSuccessCourses,
      onError: (error) => onCoursesError(error, "Failed to load courses.")
    });

  };

  const getUsersWithAssignedCourses = () => {
    setIsLoadingUserCourses(true);

    requestUsersToCourses({
      onSuccess: onSuccessUserCourses,
      onError: (error) => onUserCoursesError(error, "Failed to load users.")
    });
  };

  useEffect(() => {
    getCourseTitles();
  }, []);

  return (
    <>
      <AdminHeader title="Assign Users to Courses" />
      <RequestHandler
        error={coursesError}
        onClick={getCourseTitles}
        isLoading={isLoadingCourses}
        shouldShowWarning={!courses?.length}
        warningMessage="You don't have any courses yet...">
        <RequestHandler
          error={userCoursesError}
          onClick={getUsersWithAssignedCourses}
          isLoading={isLoadingUserCourses}
          shouldShowWarning={!usersToCourses?.length}
          warningMessage="You don't have any users yet...">
          <AssignUsersAccordion
            usersToCourses={usersToCourses}
            courses={courses}
            setUsersToCourses={setUsersToCourses}/>
        </RequestHandler>
      </RequestHandler>
    </>
  );
};

export default AssignUsers;
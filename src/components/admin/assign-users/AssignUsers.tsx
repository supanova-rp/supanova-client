import { useEffect, useState } from "react";

import useRequest from "../../../hooks/useRequest";

import Accordion from "../../admin/AdminAccordion";
import AdminHeader from "../AdminHeader";
import { CourseTitle, UserToCourses } from "src/types";
import CourseErrorLoadingHandler from "src/components/CourseErrorLoadingHandler";

const AssignUsers = () => {
  const [isLoadingCourses, setisLoadingCourses] = useState<boolean>(true);
  const [isLoadingUserCourses, setIsLoadingUserCourses] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [courses, setCourses] = useState<CourseTitle[]>([]);
  const [usersToCourses, setUsersToCourses] = useState<UserToCourses[]>([]);

  const requestCourseTitles = useRequest("/course-titles");
  const requestUsersToCourses = useRequest("/users-to-courses");

  const onError = (error: string, errorMessage: string) => {
    console.log(error);

    setisLoadingCourses(false);
    setError(errorMessage);
  };

  const onSuccessUserCourses = (results: UserToCourses[]) => {
    setIsLoadingUserCourses(false);
    setUsersToCourses(results);
  };

  const onSuccessCourses = (result: CourseTitle[]) => {
    setCourses(result);
    setisLoadingCourses(false);
    if (result.length) {
      getUsersWithAssignedCourses();
    }
  };

  const getCoursesAndUsers = () => {
    requestCourseTitles({
      onSuccess: onSuccessCourses,
      onError: (error) => onError(error, "Failed to get courses")
    });

  };

  const getUsersWithAssignedCourses = () => {
    setIsLoadingUserCourses(true);

    requestUsersToCourses({
      onSuccess: onSuccessUserCourses,
      onError: (error) => onError(error, "Failed to get users")
    });
  };

  useEffect(() => {
    getCoursesAndUsers();
  }, []);

  const users = [
    {
      name: "Marie",
      email: "marie20767@gmail.com",
      assignedCourses: [
        {
          id: 1,
          title: "Radiation Protection",
        },
        {
          id: 2,
          title: "Radiation Basics",
        },
      ]
    },
    {
      name: "Jamie",
      email: "jamiegarner123@gmail.com",
      assignedCourses: [
        {
          id: 1,
          title: "Radiation Protection"
        },
        {
          id: 3,
          title: "Radiation for large companies"
        }
      ]
    }
  ];

  return (
    <>
      <AdminHeader title="Assign Users to Courses" />
      <CourseErrorLoadingHandler
        error={error}
        onClick={getCoursesAndUsers}
        isLoading={isLoadingCourses || isLoadingUserCourses}
        courses={courses}>
        <Accordion
          users={users}
          courses={courses}/>
      </CourseErrorLoadingHandler>
    </>
  );
};

export default AssignUsers;
import { useState } from "react";
import { Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import toast from "react-hot-toast";
import {
  REACT_TOAST_DURATION,
  feedbackMessages,
} from "src/constants/constants";
import useRequest from "src/hooks/useRequest";
import { CourseTitle, UserToCourses } from "src/types";

import ToggleButton from "../../ToggleButton";

interface AccordionProps {
  usersToCourses: UserToCourses[];
  courses: CourseTitle[];
  setUsersToCourses: (parameter: UserToCourses[]) => void;
}

const AssignUsersAccordion: React.FC<AccordionProps> = ({
  usersToCourses,
  courses,
  setUsersToCourses,
}) => {
  const [loadingUserToCourseId, setLoadingUserToCourseId] = useState<{
    courseId: number;
    userId: string;
  } | null>(null);

  const updateUsersToCourses = useRequest("/update-users-to-courses");

  const onSuccess = (isAssigned: boolean, userId: string, courseId: number) => {
    setLoadingUserToCourseId(null);

    const newUsersToCoursesWithUpdatedCourseIds = usersToCourses.map(
      userToCourse => {
        if (userToCourse.id === userId && isAssigned) {
          return {
            ...userToCourse,
            courseIds: userToCourse.courseIds.filter(id => id !== courseId),
          };
        }

        if (userToCourse.id === userId) {
          return {
            ...userToCourse,
            courseIds: [...userToCourse.courseIds, courseId],
          };
        }

        return userToCourse;
      },
    );

    setUsersToCourses(newUsersToCoursesWithUpdatedCourseIds);
  };

  const onError = () => {
    setLoadingUserToCourseId(null);
    toast.error(feedbackMessages.saveChangesError, REACT_TOAST_DURATION);
  };

  const onChangeUpdateTickedCourseIds = (
    userId: string,
    courseId: number,
    isAssigned: boolean,
  ) => {
    setLoadingUserToCourseId({ courseId, userId });

    updateUsersToCourses({
      requestBody: {
        user_id: userId,
        course_id: courseId,
        isAssigned,
      },
      onSuccess: () => onSuccess(isAssigned, userId, courseId),
      onError,
    });
  };

  return (
    <Accordion flush className="admin-accordion">
      {usersToCourses.map((user: UserToCourses, index: number) => {
        return (
          <Accordion.Item eventKey={index.toString()} key={user.id}>
            <Accordion.Header className="admin-accordion-button">
              {`${user.name} (${user.email})`}
            </Accordion.Header>
            <Accordion.Body className="p-0 my-3">
              <Form>
                {courses.map((course: CourseTitle) => {
                  const isAssigned = user.courseIds?.includes(course.id);

                  return (
                    <ToggleButton
                      key={course.id}
                      label={course.title}
                      isChecked={isAssigned}
                      isLoading={
                        course.id === loadingUserToCourseId?.courseId &&
                        user.id === loadingUserToCourseId?.userId
                      }
                      onChange={() =>
                        onChangeUpdateTickedCourseIds(
                          user.id,
                          course.id,
                          isAssigned,
                        )
                      }
                    />
                  );
                })}
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default AssignUsersAccordion;

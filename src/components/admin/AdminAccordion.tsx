import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

import { CourseTitle, UserToCourses } from "src/types";

import ToggleButton from "../ToggleButton";

interface AccordionProps {
  users: UserToCourses[],
  courses: CourseTitle[],
}

const AdminAccordion: React.FC<AccordionProps> = ({ users, courses }) => {
  const [tickedCourseIds, setTickedCourseIds] = useState<number[]>([]);

  const onChangeUpdateTickedCourseIds = (courseId: number) => {
    if (tickedCourseIds.includes(courseId)) {
      const newTickedCoursesIds = tickedCourseIds.filter((id) => courseId !== id);

      setTickedCourseIds(newTickedCoursesIds);
    } else {
      const newTickedCoursesIds = [
        ...tickedCourseIds,
        courseId,
      ];

      setTickedCourseIds(newTickedCoursesIds);
    }

  };

  return (
    <Accordion
      flush
      className="admin-accordion">
      {users.map((user: UserToCourses, index: number) => {
        return (
          <Accordion.Item
            eventKey={index.toString()}
            key={`${user.name}-${user.email}`}>
            <Accordion.Header
              className="admin-accordion-button">
              {`${user.name} (${user.email})`}
            </Accordion.Header>
            <Accordion.Body className="p-0 my-3">
              <Form>
                {courses.map((course: CourseTitle) => {
                  return (
                    <ToggleButton
                      key={course.id}
                      course={course}
                      tickedCoursesIds={tickedCourseIds}
                      onChangeUpdateTickedCourseIds={onChangeUpdateTickedCourseIds} />
                  );
                })}
              </Form>
              <Button
                type="button"
                className="btn btn-primary btn-sm main-button assign-users-button">
                Save
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default AdminAccordion;
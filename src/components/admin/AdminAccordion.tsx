import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

import ToggleButton from "../ToggleButton";

interface AccordionProps {
  users: any,
  courses: any,
}

const AdminAccordion: React.FC<AccordionProps> = ({ users, courses }) => {
  const [tickedCoursesIds, setTickedCoursesIds] = useState([]);

  const onChangeUpdateTickedCourseIds = (courseId: number) => {
    if (tickedCoursesIds.includes(courseId)) {
      const newTickedCoursesIds = tickedCoursesIds.filter((id) => courseId !== id);

      setTickedCoursesIds(newTickedCoursesIds);
    } else {
      const newTickedCoursesIds = [
        ...tickedCoursesIds,
        courseId,
      ];

      setTickedCoursesIds(newTickedCoursesIds);
    }

  };

  return (
    <Accordion
      flush
      className="admin-accordion">
      {users.map((user, index: number) => {
        return (
          <Accordion.Item
            eventKey={index.toString()}
            key={`${user.name}-${user.email}`}>
            <Accordion.Header className="admin-accordion-button">{`${user.name} (${user.email})`}</Accordion.Header>
            <Accordion.Body className="p-0 my-4">
              <Form>
                {courses.map((course) => {
                  return (
                    <ToggleButton
                      key={course.id}
                      course={course}
                      tickedCoursesIds={tickedCoursesIds}
                      onChangeUpdateTickedCourseIds={onChangeUpdateTickedCourseIds} />
                  );
                })}
              </Form>
              <Button
                type="button"
                className="btn btn-primary btn-sm main-button assign-users-button">Save</Button>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default AdminAccordion;
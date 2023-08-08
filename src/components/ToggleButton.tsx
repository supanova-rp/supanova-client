import { Form } from "react-bootstrap";

const ToggleButton = ({ course, tickedCoursesIds, onChangeUpdateTickedCourseIds  }) => {
  const isChecked = tickedCoursesIds?.includes(course.id);

  return (
    <Form.Check
      className="toggle-button"
      type="switch"
      id="toggle-switch"
      label={course.title}
      checked={isChecked}
      onChange={() => onChangeUpdateTickedCourseIds(course.id)}/>
  );
};

export default ToggleButton;
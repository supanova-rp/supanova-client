import { Form, Spinner } from "react-bootstrap";

import { CourseTitle } from "src/types";

interface ToggleButtonProps {
  course: CourseTitle,
  isAssigned: boolean,
  isLoading: boolean,
  onChangeUpdateTickedCourseIds: () => void,
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  course,
  isAssigned,
  isLoading,
  onChangeUpdateTickedCourseIds
}) => {
  return (
    <div className="d-flex align-items-center">
      <Form.Check
        className="toggle-button"
        type="switch"
        id="toggle-switch"
        label={course.title}
        checked={isAssigned}
        onChange={onChangeUpdateTickedCourseIds}/>
      {isLoading
        ? (
          <Spinner
            animation="border"
            role="status"
            variant="secondary"
            size="sm">
            <span className="visually-hidden">Loading...</span>

          </Spinner>
        )
        : null
      }
    </div>
  );
};

export default ToggleButton;
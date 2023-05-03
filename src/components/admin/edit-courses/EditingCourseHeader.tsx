import { Button } from "react-bootstrap";

import { ReactComponent as ChevronLeft } from "../../../icons/chevronLeft.svg";

import { Course } from "src/types";

interface Props {
  course: Course,
  onCourseFormCancelled: (editCourseId: null) => void,
  onClickHandleShowingDeleteOverlay: (courseId: number) => void,
}

const EditingCourseHeader: React.FC<Props> = ({
  course,
  onCourseFormCancelled,
  onClickHandleShowingDeleteOverlay,
}) => {
  return (
    <div className="d-flex justify-content-md-between mb-4 align-items-center">
      <ChevronLeft
        stroke="black"
        className="clickable me-2"
        onClick={() => onCourseFormCancelled(null)} />
      <Button
        className="btn-danger"
        onClick={() => onClickHandleShowingDeleteOverlay(course.id)} >
        Delete
      </Button>
    </div>
  );
};

export default EditingCourseHeader;
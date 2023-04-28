import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { colors } from "src/constants/colorPalette";

import { ReactComponent as DeleteIcon } from "../../../icons/deleteIcon.svg";
import { ReactComponent as ChevronLeft } from "../../../icons/chevronLeft.svg";

import { Course } from "src/types";

interface Props {
  editingCourse: Course,
  onClickHandleEditingCourse: (parameter: null) => void,
  onClickHandleShowingDeleteOverlay: (courseId: number) => void,
}

const EditingCourseHeader: React.FC<Props> = ({
  editingCourse,
  onClickHandleEditingCourse,
  onClickHandleShowingDeleteOverlay,
}) => {
  return (
    <div className="d-flex justify-content-md-between mb-4 align-items-center">
      <ChevronLeft
        stroke="black"
        className="clickable me-2"
        onClick={() => onClickHandleEditingCourse(null)} />
      <Button
        className="btn-danger"
        onClick={() => onClickHandleShowingDeleteOverlay(editingCourse.id)} >
        Delete
      </Button>
    </div>
  );
};

export default EditingCourseHeader;
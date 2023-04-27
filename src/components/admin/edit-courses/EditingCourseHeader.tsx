import { colors } from "src/constants/colorPalette";

import { ReactComponent as DeleteIcon } from "../../../icons/deleteIcon.svg";
import { ReactComponent as ChevronLeft } from "../../../icons/chevronLeft.svg";
import { Course } from "src/types";

interface Props {
  editingCourse: Course,
  onClickStartEditingCourse: (parameter: null) => void,
  onClickHandleShowingDeleteOverlay: (courseId: number) => void,
}

const EditingCourseHeader: React.FC<Props> = ({
  editingCourse,
  onClickStartEditingCourse,
  onClickHandleShowingDeleteOverlay,
}) => {
  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <ChevronLeft
          className="clickable ms-2"
          onClick={() => onClickStartEditingCourse(null)} />
        <h4 className="m-0">{editingCourse.title}</h4>
        <DeleteIcon
          stroke={colors.darkgray}
          className="clickable ms-2"
          onClick={() => onClickHandleShowingDeleteOverlay(editingCourse.id)} />
      </div>
      <p className="mb-4">{editingCourse.description}</p>
    </>
  );
};

export default EditingCourseHeader;
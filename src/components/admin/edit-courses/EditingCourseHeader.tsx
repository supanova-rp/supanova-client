import { Button } from "react-bootstrap";

import ChevronLeft from "../../../assets/icons/chevronLeft.svg?react";

interface Props {
  onCourseFormCancelled: () => void;
  onShowDeleteModal: () => void;
}

const EditingCourseHeader: React.FC<Props> = ({
  onCourseFormCancelled,
  onShowDeleteModal,
}) => {
  return (
    <div className="edit-course-header-container">
      <ChevronLeft
        stroke="black"
        role="button"
        className="edit-course-header-chevron-left"
        onClick={onCourseFormCancelled}
      />
      <Button className="btn-danger" onClick={onShowDeleteModal}>
        Delete
      </Button>
    </div>
  );
};

export default EditingCourseHeader;

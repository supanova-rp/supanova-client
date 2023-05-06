import { Button } from "react-bootstrap";

import { ReactComponent as ChevronLeft } from "../../../icons/chevronLeft.svg";

interface Props {
  onCourseFormCancelled: () => void,
  onShowDeleteModal: () => void,
}

const EditingCourseHeader: React.FC<Props> = ({
  onCourseFormCancelled,
  onShowDeleteModal,
}) => {
  return (
    <div className="d-flex justify-content-md-between mb-4 align-items-center">
      <ChevronLeft
        stroke="black"
        className="clickable me-2"
        onClick={onCourseFormCancelled} />
      <Button
        className="btn-danger"
        onClick={onShowDeleteModal} >
        Delete
      </Button>
    </div>
  );
};

export default EditingCourseHeader;
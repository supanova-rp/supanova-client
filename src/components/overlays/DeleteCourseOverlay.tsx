import { Button } from "react-bootstrap";
import Overlay from "./Overlay";

interface Props {
  areActionsDisabled: boolean,
  onHideDeleteModal: () => void,
  onClickDeleteCourse: React.MouseEventHandler<HTMLButtonElement>,
}

const DeleteCourseOverlay: React.FC<Props> = ({
  areActionsDisabled,
  onHideDeleteModal,
  onClickDeleteCourse,
}) => {
  return (
    <Overlay onClick={onHideDeleteModal}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h5>Are you sure you want to delete this Course?</h5>
        <div className="mt-3">
          <Button
            type="button"
            onClick={onHideDeleteModal}
            className="me-2 secondary-button">
            Cancel
          </Button>
          <Button
            type="button"
            disabled={areActionsDisabled}
            onClick={onClickDeleteCourse}
            className="ms-2 btn-danger">
            Confirm
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default DeleteCourseOverlay;

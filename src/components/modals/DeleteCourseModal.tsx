import { Button } from "react-bootstrap";
import Modal from "./Modal";

interface Props {
  areActionsDisabled: boolean,
  onHideDeleteModal: () => void,
  onClickDelete: React.MouseEventHandler<HTMLButtonElement>,
}

const DeleteCourseModal: React.FC<Props> = ({
  areActionsDisabled,
  onHideDeleteModal,
  onClickDelete,
}) => {
  return (
    <Modal onClick={onHideDeleteModal}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h5>Are you sure you want to delete this Course?</h5>
        <div className="mt-3">
          <Button
            type="button"
            disabled={areActionsDisabled}
            onClick={onHideDeleteModal}
            className="me-2 secondary-button">
            Cancel
          </Button>
          <Button
            type="button"
            disabled={areActionsDisabled}
            onClick={onClickDelete}
            className="ms-2 btn-danger">
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCourseModal;

import { Alert, Button } from 'react-bootstrap';
import Overlay from './Overlay';

interface Props {
  isLoading: boolean,
  deleteCourseErrorMessage: string | null,
  onClickHandleShowingDeleteOverlay: (parameter: number | null) => void,
  onClickDeleteCourse: React.MouseEventHandler<HTMLButtonElement>,
}

const DeleteCourseOverlay: React.FC<Props> = ({
  isLoading,
  deleteCourseErrorMessage,
  onClickHandleShowingDeleteOverlay,
  onClickDeleteCourse,
}) => {
  return (
    <Overlay onClick={onClickHandleShowingDeleteOverlay}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h5>Are you sure you want to delete this Course?</h5>
        {deleteCourseErrorMessage
          ? <Alert variant="danger" className="p-2 my-2">{deleteCourseErrorMessage}</Alert>
          : null
        }
        <div className="mt-3">
          <Button type="button" onClick={() => onClickHandleShowingDeleteOverlay(null)} className="me-2 secondary-button">Cancel</Button>
          <Button type="button" disabled={isLoading} onClick={onClickDeleteCourse} className="ms-2 btn-danger">Confirm</Button>
        </div>
      </div>
    </Overlay>
  );
};

export default DeleteCourseOverlay;

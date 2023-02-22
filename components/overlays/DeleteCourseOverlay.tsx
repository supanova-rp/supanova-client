import { Alert, Button } from 'react-bootstrap';
import Overlay from './Overlay';

interface Props {
  courseId: number,
  isLoading: boolean,
  deleteCourseErrorMessage: string | null,
  onClickHandleShowingDeleteOverlay: (parameter: boolean) => void,
  onClickDeleteCourse: (parameter: number) => void,
}

const DeleteCourseOverlay: React.FC<Props> = ({
  courseId,
  isLoading,
  deleteCourseErrorMessage,
  onClickHandleShowingDeleteOverlay,
  onClickDeleteCourse,
}) => {
  return (
    // TODO: center the overlay text
    <Overlay onClick={onClickHandleShowingDeleteOverlay}>
      <div className="d-flex flex-column align-items-center justify-content-center mt-3">
        <h5>Are you sure you want to delete this Course?</h5>
        {deleteCourseErrorMessage
          ? <Alert variant="danger" className="p-2 my-2">{deleteCourseErrorMessage}</Alert>
          : null
        }
        <div className="mt-3">
          <Button type="button" onClick={() => onClickHandleShowingDeleteOverlay(false)} className="me-2 secondary-button">Cancel</Button>
          <Button type="button" disabled={isLoading} onClick={() => onClickDeleteCourse(courseId)} className="ms-2 btn-danger">Confirm</Button>
        </div>
      </div>
    </Overlay>
  );
};

export default DeleteCourseOverlay;

import { Course, FormSubmitEvent } from '@/index';
import { AxiosProgressEvent } from 'axios';
import { Alert, Button, Form } from 'react-bootstrap';
import AddMoreInputs from '../AddMoreInputs';

import CourseListView from './CourseListView';
import EditCourseView from './EditCourseView';

interface Props {
  index: number,
  course: Course,
  isLoading: boolean,
  errorMessage: string | null,
  deleteCourseErrorMessage: string | null,
  showDeleteCourseOverlay: boolean,
  handleRemoveSection: (paramater: number) => void,
  onFileUploaded: (parameter1: number, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  onUpdateStateAfterCancellingFileUpload: (parameter: number) => void,
  onClickAddNewSection: (parameter: number) => void,
  onClickStartEditingCourse: (parameter1: number, parameter2: boolean) => void,
  onChangeCourseField: (paramter1: number, parameter2: string, parameter3: string) => void,
  onChangeSectionTitle: (paramter1: number, parameter2: string) => void,
  onClickCancelEditingCourse: () => void,
  onClickSaveEditedCourse: (e: FormSubmitEvent, courseId: number) => void,
  onClickDeleteCourse: (parameter: number) => void,
  onClickHandleShowingDeleteOverlay: (parameter: boolean) => void,
}

const ExistingCourse: React.FC<Props> = ({
  index,
  course,
  isLoading,
  showDeleteCourseOverlay,
  errorMessage,
  deleteCourseErrorMessage,
  handleRemoveSection,
  onFileUploaded,
  onFileUploadProgress,
  onUpdateStateAfterCancellingFileUpload,
  onClickAddNewSection,
  onClickStartEditingCourse,
  onClickCancelEditingCourse,
  onChangeCourseField,
  onChangeSectionTitle,
  onClickSaveEditedCourse,
  onClickDeleteCourse,
  onClickHandleShowingDeleteOverlay,
}) => {
  if (course.isEditing) {
    const alertVariant = errorMessage?.includes('Please') ? 'warning' : 'danger';

    return (
      <Form onSubmit={(e) => onClickSaveEditedCourse(e, course.id)}>
        {errorMessage
          ? <Alert variant={alertVariant}>{errorMessage}</Alert>
          : null
        }

        <EditCourseView
          course={course}
          onChangeCourseField={onChangeCourseField}
          onChangeSectionTitle={onChangeSectionTitle}
          onFileUploaded={onFileUploaded}
          onFileUploadProgress={onFileUploadProgress}
          onUpdateStateAfterCancellingFileUpload={onUpdateStateAfterCancellingFileUpload}
          handleRemoveSection={handleRemoveSection} />
        <AddMoreInputs title="Add another section" onClick={() => onClickAddNewSection(course.id)} />
        <div className="mb-5">
          <Button className="edit-course-save-btn" type="submit" disabled={isLoading}>Save</Button>
          <Button
            className="btn-danger"
            type="button"
            onClick={onClickCancelEditingCourse}>
            Cancel
          </Button>
        </div>
      </Form>
    );
  }

  return (
    <CourseListView
      course={course}
      index={index}
      isLoading={isLoading}
      deleteCourseErrorMessage={deleteCourseErrorMessage}
      showDeleteCourseOverlay={showDeleteCourseOverlay}
      onClickStartEditingCourse={onClickStartEditingCourse}
      onClickDeleteCourse={onClickDeleteCourse}
      onClickHandleShowingDeleteOverlay={onClickHandleShowingDeleteOverlay} />
  );
};

export default ExistingCourse;

import { Course, InputChangeEvent } from '@/index';
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
  handleRemoveSection: (paramater: number) => void,
  onFileUploaded: (parameter1: number, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  onUpdateStateAfterCancellingFileUpload: (parameter: number) => void,
  onClickAddNewSection: (parameter: number) => void,
  onClickStartEditingCourse: (parameter1: number, parameter2: boolean) => void,
  onChangeCourseField: (paramter1: number, parameter2: string, parameter3: string) => void,
  onChangeSectionTitleField: (paramter1: number, parameter2: string) => void,
  onClickCancelEditingCourse: () => void,
  onClickSaveEditedCourse: (e: InputChangeEvent, courseId: string) => void,
  onClickDeleteCourse: (parameter: number) => void,
}

const ExistingCourse: React.FC<Props> = ({
  index,
  course,
  isLoading,
  errorMessage,
  handleRemoveSection,
  onFileUploaded,
  onFileUploadProgress,
  onUpdateStateAfterCancellingFileUpload,
  onClickAddNewSection,
  onClickStartEditingCourse,
  onClickCancelEditingCourse,
  onChangeCourseField,
  onChangeSectionTitleField,
  onClickSaveEditedCourse,
  onClickDeleteCourse,
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
          onChangeSectionTitleField={onChangeSectionTitleField}
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
      onClickStartEditingCourse={onClickStartEditingCourse}
      onClickDeleteCourse={onClickDeleteCourse} />
  );
};

export default ExistingCourse;

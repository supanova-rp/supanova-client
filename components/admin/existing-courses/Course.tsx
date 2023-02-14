import { ServerSideCourse } from '@/index';
import { AxiosProgressEvent } from 'axios';
import { Button } from 'react-bootstrap';
import AddMoreInputs from '../AddMoreInputs';

import CourseListView from './CourseListView';
import EditCourseView from './EditCourseView';

interface Props {
  course: ServerSideCourse,
  onClickHandleEditCourse: (parameter1: number, parameter2: boolean) => void,
  onChangeCourseField: (paramter1: number, parameter2: string, parameter3: string) => void,
  onChangeSectionTitleField: (paramter1: number, parameter2: string) => void
  onFileUploaded: (parameter1: number, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  onUpdateStateAfterCancellingFileUpload: (parameter: number) => void,
  handleRemoveSection: (paramater: number) => void,
  index: number,
  onClickAddNewSection: () => void,
}

const Course: React.FC<Props> = ({
  course,
  onClickHandleEditCourse,
  onChangeCourseField,
  onChangeSectionTitleField,
  onFileUploaded,
  onFileUploadProgress,
  onUpdateStateAfterCancellingFileUpload,
  index,
  handleRemoveSection,
  onClickAddNewSection,
}) => {
  if (course.isEditing) {
    return (
      <div>
        <EditCourseView
          course={course}
          onClickHandleEditCourse={onClickHandleEditCourse}
          onChangeCourseField={onChangeCourseField}
          onChangeSectionTitleField={onChangeSectionTitleField}
          onFileUploaded={onFileUploaded}
          onFileUploadProgress={onFileUploadProgress}
          onUpdateStateAfterCancellingFileUpload={onUpdateStateAfterCancellingFileUpload}
          handleRemoveSection={handleRemoveSection} />
        <AddMoreInputs title="Add another section" onClick={onClickAddNewSection} />
        <div className="mb-5">
          <Button className="edit-course-save-btn" type="submit">Save</Button>
          <Button
            className="btn-danger"
            type="button"
            onClick={() => onClickHandleEditCourse(course.id, false)}>
            Cancel
          </Button>
        </div>
      </div>

    );
  }

  return <CourseListView course={course} onClickHandleEditCourse={onClickHandleEditCourse} index={index} />;
};

export default Course;

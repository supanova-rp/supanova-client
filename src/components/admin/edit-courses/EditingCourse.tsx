import { AxiosProgressEvent } from "axios";
import { Button } from "react-bootstrap";

import { Course } from "src/types";

import AddMoreInputs from "../AddMoreInputs";
import CourseForm from "./CourseForm";
import EditingCourseHeader from "./EditingCourseHeader";

interface Props {
  editingCourse: Course,
  areActionsDisabled: boolean,
  onChangeCourseField: (key: string, newInputValue: string) => void,
  onChangeSectionTitle: (sectionId: number, newInputValue: string) => void,
  onFileUploaded: (sectionId: number, videoUrl: string) => void,
  onFileUploadProgress: (data: AxiosProgressEvent, sectionId: number) => void,
  onUpdateStateAfterCancellingFileUpload: (sectionId: number) => void,
  handleRemoveSection: (sectionId: number) => void,
  onClickAddNewSection: () => void,
  onClickCancelEditingCourse: () => void,
  onClickHandleShowingDeleteOverlay: (courseIdToDelete: number | null) => void,
  onClickHandleEditingCourse: (parameter: null) => void,
}

const EditingCourse: React.FC<Props> = ({
  editingCourse,
  areActionsDisabled,
  onChangeCourseField,
  onChangeSectionTitle,
  onFileUploaded,
  onFileUploadProgress,
  onUpdateStateAfterCancellingFileUpload,
  handleRemoveSection,
  onClickAddNewSection,
  onClickCancelEditingCourse,
  onClickHandleShowingDeleteOverlay,
  onClickHandleEditingCourse,
}) => {
  return (
    <>
      <EditingCourseHeader
        editingCourse={editingCourse}
        onClickHandleShowingDeleteOverlay={onClickHandleShowingDeleteOverlay}
        onClickHandleEditingCourse={onClickHandleEditingCourse} />
      <CourseForm
        course={editingCourse}
        onChangeCourseField={onChangeCourseField}
        onChangeSectionTitle={onChangeSectionTitle}
        onFileUploaded={onFileUploaded}
        onFileUploadProgress={onFileUploadProgress}
        onUpdateStateAfterCancellingFileUpload={onUpdateStateAfterCancellingFileUpload}
        handleRemoveSection={handleRemoveSection} />
      <AddMoreInputs
        title="Add another section"
        onClick={onClickAddNewSection} />
      <div className="mb-5">
        <Button
          className="edit-course-save-btn secondary-button"
          type="submit"
          disabled={areActionsDisabled}>
          Save
        </Button>
        <Button
          className="btn-danger"
          type="button"
          onClick={onClickCancelEditingCourse}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default EditingCourse;
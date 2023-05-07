import { AxiosProgressEvent } from "axios";
import { Button } from "react-bootstrap";

import { Course } from "src/types";

import AddMoreInputs from "./AddMoreInputs";
import EditingCourseHeader from "../edit-courses/EditingCourseHeader";
import EditSection from "./EditSection";
import FormInput from "../../FormInput";

interface Props {
  course: Course,
  isEditing: boolean,
  areActionsDisabled: boolean,
  onChangeCourseField: (key: string, newInputValue: string) => void,
  onChangeSectionTitle: (sectionId: number, newInputValue: string) => void,
  onFileUploaded: (sectionId: number, videoUrl: string) => void,
  onFileUploadProgress: (data: AxiosProgressEvent, sectionId: number) => void,
  onFileUploadCancelled: (sectionId: number) => void,
  handleRemoveSection: (sectionId: number) => void,
  onClickAddNewSection: () => void,
  onCourseFormCancelled: () => void,
  onShowDeleteModal: () => void,
}

const CourseFormBody: React.FC<Props> = ({
  course,
  isEditing = false,
  areActionsDisabled,
  onChangeCourseField,
  onChangeSectionTitle,
  onFileUploaded,
  onFileUploadProgress,
  onFileUploadCancelled,
  handleRemoveSection,
  onClickAddNewSection,
  onCourseFormCancelled,
  onShowDeleteModal,
}) => {
  return (
    <div className="my-4">
      {isEditing
        ? (
          <EditingCourseHeader
            onShowDeleteModal={onShowDeleteModal}
            onCourseFormCancelled={onCourseFormCancelled} />
        )
        : null
      }

      <div className="mb-4">
        <FormInput
          formId="course-title"
          value={course.title}
          label="Course Title"
          onChange={(e) => onChangeCourseField("title", e.target.value)}
          type="text"
          formGroupClassname="mb-4 course-title" />
        <FormInput
          formId="course-desription"
          value={course.description}
          label="Course Description"
          onChange={(e) => onChangeCourseField("description", e.target.value)}
          type="text"
          formGroupClassname="mb-4 course-description" />

        {!isEditing
          ? <h5 className="mt-5 mb-1">Add your Course Sections</h5>
          : null
        }

        {course.sections.map((section, sectionIndex) => {
          return (
            <EditSection
              key={section.id}
              index={sectionIndex}
              section={section}
              canRemove={course.sections.length > 1}
              onChangeSectionTitle={onChangeSectionTitle}
              onFileUploaded={onFileUploaded}
              onFileUploadProgress={onFileUploadProgress}
              onFileUploadCancelled={onFileUploadCancelled}
              handleRemoveSection={handleRemoveSection} />
          );
        })}
      </div>

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
          onClick={onCourseFormCancelled}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CourseFormBody;
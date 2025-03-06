import { AxiosProgressEvent } from "axios";
import { Button } from "react-bootstrap";
import {
  Course,
  CourseQuizQuestion,
  CourseSection,
  ID,
  onChangeCourseFieldKey,
} from "src/types";

import CourseFormSection from "./CourseFormSection";
import { CourseMaterials } from "./CourseMaterials";
import { MoveSectionFn } from "./utils";
import AddMoreInputs from "../../AddMoreInputs";
import FormInput from "../../FormInput";
import EditingCourseHeader from "../edit-courses/EditingCourseHeader";

interface Props {
  course: Course;
  isEditing: boolean;
  videoSections: CourseSection[];
  areActionsDisabled: boolean;
  onChangeCourseField: (
    key: onChangeCourseFieldKey,
    newInputValue: string,
  ) => void;
  onChangeSectionTitle: (sectionId: ID, newInputValue: string) => void;
  onHandleUpdateQuiz: (
    quizId: ID,
    quizQuestionsAndAnswers: CourseQuizQuestion[],
  ) => void;
  onVideoFileUploaded: (sectionId: ID, videoUrl: string) => void;
  onVideoFileUploadProgress: (data: AxiosProgressEvent, sectionId: ID) => void;
  onVideoFileUploadCancelled: (sectionId: ID) => void;
  handleRemoveSection: (sectionId: ID) => void;
  onCourseMaterialUploaded: (id: ID, videoUrl: string) => void;
  onCourseMaterialUploadProgress: (data: AxiosProgressEvent, id: ID) => void;
  onCourseMaterialUploadCancelled: (id: ID) => void;
  handleRemoveMaterial: (id: ID) => void;
  onChangeMaterialName: (id: ID, name: string) => void;
  onClickAddCourseMaterial: () => void;
  onClickAddNewVideoSection: () => void;
  onClickAddNewQuizSection: () => void;
  onClickAddNewQuizQuestion: (quizId: ID) => void;
  onHandleAddNewQuizAnswer: (
    quizId: ID,
    updatedQuizQuestions: CourseQuizQuestion[],
  ) => void;
  onClickRemoveQuizQuestion: (quizId: ID, questionId: string) => void;
  onCourseFormCancelled: () => void;
  onShowDeleteModal: () => void;
  onMoveSection: MoveSectionFn;
}

const CourseFormBody: React.FC<Props> = ({
  course,
  isEditing = false,
  videoSections,
  areActionsDisabled,
  onChangeCourseField,
  onChangeSectionTitle,
  onHandleUpdateQuiz,
  onVideoFileUploaded,
  onVideoFileUploadProgress,
  onVideoFileUploadCancelled,
  handleRemoveSection,
  onCourseMaterialUploaded,
  onCourseMaterialUploadProgress,
  onCourseMaterialUploadCancelled,
  handleRemoveMaterial,
  onMoveSection,
  onChangeMaterialName,
  onClickAddCourseMaterial,
  onClickRemoveQuizQuestion,
  onClickAddNewVideoSection,
  onClickAddNewQuizSection,
  onClickAddNewQuizQuestion,
  onHandleAddNewQuizAnswer,
  onCourseFormCancelled,
  onShowDeleteModal,
}) => {
  return (
    <div className="my-4">
      {isEditing ? (
        <EditingCourseHeader
          onShowDeleteModal={onShowDeleteModal}
          onCourseFormCancelled={onCourseFormCancelled}
        />
      ) : null}

      <div>
        <FormInput
          formId="course-title"
          value={course.title}
          label="Course Title"
          onChange={e => onChangeCourseField("title", e.target.value)}
          type="text"
          formGroupClassname="mb-4 course-title"
        />
        <FormInput
          formId="course-desription"
          value={course.description}
          label="Course Description"
          onChange={e => onChangeCourseField("description", e.target.value)}
          type="text"
          formGroupClassname="mb-4 course-description"
        />

        <CourseMaterials
          materials={course.materials}
          courseId={course.id}
          onChangeMaterialName={onChangeMaterialName}
          onClickAddCourseMaterial={onClickAddCourseMaterial}
          onCourseMaterialUploaded={onCourseMaterialUploaded}
          onCourseMaterialUploadProgress={onCourseMaterialUploadProgress}
          onCourseMaterialUploadCancelled={onCourseMaterialUploadCancelled}
          handleRemoveMaterial={handleRemoveMaterial}
        />

        {!isEditing ? <h5 className="mt-5 mb-1">Add Course Sections</h5> : null}

        {course.sections.map((section, index) => {
          return (
            <CourseFormSection
              key={section.id}
              section={section}
              courseId={course.id}
              isEditing={isEditing}
              isFirstSection={index === 0}
              isLastSection={index === course.sections.length - 1}
              canRemoveVideoSection={videoSections.length > 1}
              onHandleAddNewQuizAnswer={onHandleAddNewQuizAnswer}
              onClickAddNewQuizQuestion={onClickAddNewQuizQuestion}
              onClickRemoveQuizQuestion={onClickRemoveQuizQuestion}
              onChangeSectionTitle={onChangeSectionTitle}
              onHandleUpdateQuiz={onHandleUpdateQuiz}
              onMoveSection={onMoveSection}
              onVideoFileUploaded={onVideoFileUploaded}
              onVideoFileUploadProgress={onVideoFileUploadProgress}
              onVideoFileUploadCancelled={onVideoFileUploadCancelled}
              handleRemoveSection={handleRemoveSection}
            />
          );
        })}
      </div>
      <div className="mt-4">
        <AddMoreInputs
          title="Add quiz section"
          onClick={onClickAddNewQuizSection}
          marginBottom="mb-0"
        />
        <AddMoreInputs
          title="Add video section"
          onClick={onClickAddNewVideoSection}
        />
      </div>
      <div className="mb-5">
        <Button
          className="edit-course-save-btn main-button small-main-button"
          type="submit"
          disabled={areActionsDisabled}
        >
          Save
        </Button>
        <Button
          className="btn-danger"
          type="button"
          onClick={onCourseFormCancelled}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CourseFormBody;

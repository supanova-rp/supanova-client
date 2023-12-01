import { AxiosProgressEvent } from "axios";
import { Button } from "react-bootstrap";

import { Course, CourseQuizQuestion, CourseSection } from "src/types";

import AddMoreInputs from "../../AddMoreInputs";
import EditingCourseHeader from "../edit-courses/EditingCourseHeader";
import CourseFormSection from "./CourseFormSection";
import FormInput from "../../FormInput";

interface Props {
  course: Course,
  isEditing: boolean,
  videoSections: CourseSection[],
  areActionsDisabled: boolean,
  onChangeCourseField: (key: string, newInputValue: string) => void,
  onChangeSectionTitle: (sectionId: number, newInputValue: string) => void,
  onHandleUpdateQuiz: (quizId: number, quizQuestionsAndAnswers: CourseQuizQuestion[]) => void,
  onFileUploaded: (sectionId: number, videoUrl: string) => void,
  onFileUploadProgress: (data: AxiosProgressEvent, sectionId: number) => void,
  onFileUploadCancelled: (sectionId: number) => void,
  handleRemoveSection: (sectionId: number) => void,
  onClickAddNewVideoSection: () => void,
  onClickAddNewQuizSection: () => void,
  onClickAddNewQuizQuestion: (quizId: number) => void,
  onHandleAddNewQuizAnswer: (quizId: number, updatedQuizQuestions: CourseQuizQuestion[]) => void,
  onClickRemoveQuizQuestion: (quizId: number, questionId: string) => void,
  onCourseFormCancelled: () => void,
  onShowDeleteModal: () => void,
}

const CourseFormBody: React.FC<Props> = ({
  course,
  isEditing = false,
  videoSections,
  areActionsDisabled,
  onChangeCourseField,
  onChangeSectionTitle,
  onHandleUpdateQuiz,
  onFileUploaded,
  onFileUploadProgress,
  onFileUploadCancelled,
  handleRemoveSection,
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
      {isEditing
        ? (
          <EditingCourseHeader
            onShowDeleteModal={onShowDeleteModal}
            onCourseFormCancelled={onCourseFormCancelled} />
        )
        : null
      }

      <div>
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
          ? <h5 className="mt-5 mb-1">Add Course Sections</h5>
          : null
        }

        {course.sections.map((section, index) => {
          return (
            <CourseFormSection
              key={section.id}
              section={section}
              isLastSection={index === course.sections.length - 1}
              canRemoveVideoSection={videoSections.length > 1}
              onHandleAddNewQuizAnswer={onHandleAddNewQuizAnswer}
              onClickAddNewQuizQuestion={onClickAddNewQuizQuestion}
              onClickRemoveQuizQuestion={onClickRemoveQuizQuestion}
              onChangeSectionTitle={onChangeSectionTitle}
              onHandleUpdateQuiz={onHandleUpdateQuiz}
              onFileUploaded={onFileUploaded}
              onFileUploadProgress={onFileUploadProgress}
              onFileUploadCancelled={onFileUploadCancelled}
              handleRemoveSection={handleRemoveSection} />
          );
        })}
      </div>
      <div className="mt-4">
        <AddMoreInputs
          title="Add quiz section"
          onClick={onClickAddNewQuizSection}
          marginBottom="mb-0" />
        <AddMoreInputs
          title="Add video section"
          onClick={onClickAddNewVideoSection} />
      </div>
      <div className="mb-5">
        <Button
          className="edit-course-save-btn main-button small-main-button"
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
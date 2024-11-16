import { AxiosProgressEvent } from "axios";
import { Component } from "react";
import {
  Course,
  CourseQuizQuestion,
  CourseSection,
  ID,
  onChangeCourseFieldKey,
  SectionTypes,
} from "src/types";

import CourseFormBody from "./CourseFormBody";
import {
  getCourseWithNewSection,
  getInitialEmptyQuizQuestionAndAnswers,
  getQuizWithNewQuizQuestion,
  getUpdatedCourse,
} from "./utils";

interface CourseFormProps {
  course: Course;
  isEditing: boolean;
  videoSections: CourseSection[];
  areActionsDisabled: boolean;
  onUpdateCourse: (course: Course) => void;
  onShowDeleteModal: () => void;
  onCourseFormCancelled: () => void;
}

export default class CourseForm extends Component<CourseFormProps> {
  onChangeCourseField = (
    key: onChangeCourseFieldKey,
    newInputValue: string,
  ) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      [key]: newInputValue,
    });
  };

  onFileUploadCancelled = (sectionId: ID) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(getUpdatedCourse(course, sectionId, "uploadProgress", null));
  };

  onFileUploaded = (sectionId: ID, videoUrl: string) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(getUpdatedCourse(course, sectionId, "videoUrl", videoUrl));
  };

  onFileUploadProgress = (data: AxiosProgressEvent, sectionId: ID) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(
      getUpdatedCourse(course, sectionId, "uploadProgress", data.progress),
    );
  };

  onChangeSectionTitle = (sectionId: ID, inputValue: string) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(getUpdatedCourse(course, sectionId, "title", inputValue));
  };

  onHandleUpdateQuiz = (
    quizId: ID,
    quizQuestionsAndAnswers: CourseQuizQuestion[],
  ) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(
      getUpdatedCourse(course, quizId, "questions", quizQuestionsAndAnswers),
    );
  };

  onClickAddNewVideoSection = () => {
    const { course, isEditing, onUpdateCourse } = this.props;

    const newSection: CourseSection = {
      id: `${Date.now()}`,
      title: "",
      type: SectionTypes.Video,
      videoUrl: null,
      isNewSection: isEditing,
    };

    const updatedCourseWithNewVideoSection = getCourseWithNewSection(
      course,
      newSection,
    );

    onUpdateCourse(updatedCourseWithNewVideoSection);
  };

  onClickAddNewQuizSection = () => {
    const { course, onUpdateCourse, isEditing } = this.props;

    const newQuizSection: CourseSection = {
      id: `${Date.now()}`,
      type: SectionTypes.Quiz,
      questions: [getInitialEmptyQuizQuestionAndAnswers(isEditing)],
      isNewSection: isEditing,
    };

    const updatedCourseWithNewQuizSection = getCourseWithNewSection(
      course,
      newQuizSection,
    );

    onUpdateCourse(updatedCourseWithNewQuizSection);
  };

  onClickAddNewQuizQuestion = (quizId: ID) => {
    const { course, onUpdateCourse, isEditing } = this.props;

    const courseWithUpdatedQuiz = getQuizWithNewQuizQuestion(
      course,
      quizId,
      isEditing,
    );

    onUpdateCourse(courseWithUpdatedQuiz);
  };

  onHandleAddNewQuizAnswer = (
    quizId: ID,
    updatedQuizQuestions: CourseQuizQuestion[],
  ) => {
    const { course, onUpdateCourse } = this.props;

    const courseWithAddedQuizAnswer = getUpdatedCourse(
      course,
      quizId,
      "questions",
      updatedQuizQuestions,
    );

    onUpdateCourse(courseWithAddedQuizAnswer);
  };

  handleRemoveSection = (sectionId: ID) => {
    const { course, onUpdateCourse } = this.props;

    const updatedSections = course.sections.filter(
      section => sectionId !== section.id,
    );

    onUpdateCourse({
      ...course,
      sections: updatedSections,
    });
  };

  onClickRemoveQuizQuestion = (quizId: ID, questionId: string) => {
    const { course, onUpdateCourse } = this.props;

    const updatedSectionsMinusQuizQuestion = course.sections.map(section => {
      if (section.id === quizId && section.questions) {
        const updatedQuiz = section.questions.filter(
          question => question.id !== questionId,
        );

        return {
          ...section,
          questions: updatedQuiz,
        };
      }

      return section;
    });

    onUpdateCourse({
      ...course,
      sections: updatedSectionsMinusQuizQuestion,
    });
  };

  onMoveSection = (sectionId: ID, direction: "up" | "down") => {
    const { course, onUpdateCourse } = this.props;

    const currentIndex = course.sections.findIndex(s => s.id === sectionId);

    if (currentIndex === -1) {
      return;
    }

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    const updatedSections = structuredClone(course.sections);
    const currentSection = updatedSections[currentIndex];

    updatedSections[currentIndex] = updatedSections[targetIndex];
    updatedSections[targetIndex] = currentSection;

    onUpdateCourse({
      ...course,
      sections: updatedSections,
    });
  };

  render() {
    const {
      course,
      videoSections,
      onCourseFormCancelled,
      isEditing,
      areActionsDisabled,
      onShowDeleteModal,
    } = this.props;

    return (
      <CourseFormBody
        course={course}
        videoSections={videoSections}
        isEditing={isEditing}
        areActionsDisabled={areActionsDisabled}
        onChangeCourseField={this.onChangeCourseField}
        onChangeSectionTitle={this.onChangeSectionTitle}
        onHandleUpdateQuiz={this.onHandleUpdateQuiz}
        onFileUploaded={this.onFileUploaded}
        onFileUploadProgress={this.onFileUploadProgress}
        onFileUploadCancelled={this.onFileUploadCancelled}
        handleRemoveSection={this.handleRemoveSection}
        onMoveSection={this.onMoveSection}
        onClickAddNewVideoSection={this.onClickAddNewVideoSection}
        onClickAddNewQuizSection={this.onClickAddNewQuizSection}
        onClickAddNewQuizQuestion={this.onClickAddNewQuizQuestion}
        onHandleAddNewQuizAnswer={this.onHandleAddNewQuizAnswer}
        onClickRemoveQuizQuestion={this.onClickRemoveQuizQuestion}
        onShowDeleteModal={onShowDeleteModal}
        onCourseFormCancelled={onCourseFormCancelled}
      />
    );
  }
}

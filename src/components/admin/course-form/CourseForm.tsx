import { Component } from "react";
import { AxiosProgressEvent } from "axios";

import {
  Course,
  CourseQuizQuestion,
  CourseSection,
} from "src/types";
import {
  getCourseWithNewSection,
  getInitialEmptyQuizQuestionAndAnswers,
  getQuizWithNewQuizQuestion,
  getUpdatedCourse
} from "./utils";

import CourseFormBody from "./CourseFormBody";

interface CourseFormProps {
  course: Course,
  isEditing: boolean,
  videoSections: CourseSection[],
  areActionsDisabled: boolean,
  onUpdateCourse: (course: Course) => void,
  onShowDeleteModal: () => void,
  onCourseFormCancelled: () => void,
}

export default class CourseForm extends Component <CourseFormProps> {
  onChangeCourseField = (key: string, newInputValue: string) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      [key]: newInputValue,
    });
  };

  onFileUploadCancelled = (sectionId: number) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(getUpdatedCourse(course, sectionId, "uploadProgress", null));
  };

  onFileUploaded = (sectionId: number, videoUrl: string) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(getUpdatedCourse(course, sectionId, "videoUrl", videoUrl));
  };

  onFileUploadProgress = (data: AxiosProgressEvent, sectionId: number) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(getUpdatedCourse(course, sectionId,  "uploadProgress", data.progress));
  };

  onChangeSectionTitle = (sectionId: number, inputValue: string) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(getUpdatedCourse(course, sectionId, "title", inputValue));
  };

  onHandleUpdateQuiz = (quizId: number, quizQuestionsAndAnswers: CourseQuizQuestion[]) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(getUpdatedCourse(course, quizId, "questions", quizQuestionsAndAnswers));
  };

  onClickAddNewVideoSection = () => {
    const { course, onUpdateCourse } = this.props;

    const newSection = {
      id: Date.now(),
      title: "",
      videoUrl: null,
      isNewSection: this.props.isEditing,
    };

    const updatedCourseWithNewVideoSection = getCourseWithNewSection(course, newSection);

    onUpdateCourse(updatedCourseWithNewVideoSection);
  };

  onClickAddNewQuizSection = () => {
    const { course, onUpdateCourse } = this.props;

    const newQuizSection = {
      id: Date.now(),
      questions: [getInitialEmptyQuizQuestionAndAnswers()],
      isNewSection: this.props.isEditing,
    };

    const updatedCourseWithNewQuizSection = getCourseWithNewSection(course, newQuizSection);

    onUpdateCourse(updatedCourseWithNewQuizSection);
  };

  onClickAddNewQuizQuestion = (quizId: number) => {
    const { course, onUpdateCourse } = this.props;

    const courseWithUpdatedQuiz = getQuizWithNewQuizQuestion(course, quizId);

    onUpdateCourse(courseWithUpdatedQuiz);
  };

  onHandleAddNewQuizAnswer = (quizId: number, updatedQuizQuestions: CourseQuizQuestion[]) => {
    const { course, onUpdateCourse } = this.props;

    const courseWithAddedQuizAnswer = getUpdatedCourse(course, quizId, "questions", updatedQuizQuestions);

    onUpdateCourse(courseWithAddedQuizAnswer);
  };

  handleRemoveSection = (sectionId: number) => {
    const { course, onUpdateCourse } = this.props;

    const updatedSections = course.sections.filter((section) => sectionId !== section.id);

    onUpdateCourse({
      ...course,
      sections: updatedSections,
    });
  };

  onClickRemoveQuizQuestion = (quizId: number, questionId: string) => {
    const { course, onUpdateCourse } = this.props;

    const updatedSectionsMinusQuizQuestion = course.sections.map((section) => {
      if (section.id === quizId && section.questions) {
        const updatedQuiz = section.questions.filter((question) => question.id !== questionId);

        return {
          ...section,
          questions: updatedQuiz,
        };
      }

      return section;

    });

    onUpdateCourse({
      ...course,
      sections: updatedSectionsMinusQuizQuestion
    });
  };

  render() {
    const {
      course,
      videoSections,
      onCourseFormCancelled,
      isEditing,
      areActionsDisabled,
      onShowDeleteModal
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
        onClickAddNewVideoSection={this.onClickAddNewVideoSection}
        onClickAddNewQuizSection={this.onClickAddNewQuizSection}
        onClickAddNewQuizQuestion={this.onClickAddNewQuizQuestion}
        onHandleAddNewQuizAnswer={this.onHandleAddNewQuizAnswer}
        onClickRemoveQuizQuestion={this.onClickRemoveQuizQuestion}
        onShowDeleteModal={onShowDeleteModal}
        onCourseFormCancelled={onCourseFormCancelled} />
    );
  }
};

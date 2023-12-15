import React, { createRef } from "react";
import { AxiosProgressEvent } from "axios";

import { CourseQuizQuestion, CourseSection } from "../../../types/index";

import VideoSection from "./VideoSection";
import QuizSection from "./QuizSection";
import AddMoreInputs from "src/components/AddMoreInputs";

interface Props {
  section: CourseSection,
  isLastSection: boolean,
  isEditing: boolean,
  canRemoveVideoSection: boolean,
  onChangeSectionTitle: (parameter1: number, parameter2: string) => void,
  onHandleUpdateQuiz: (quizId: number, quizQuestionsAndAnswers: CourseQuizQuestion[]) => void,
  onClickAddNewQuizQuestion: (quizId: number) => void,
  onHandleAddNewQuizAnswer: (quizId: number, updatedQuizQuestions: CourseQuizQuestion[]) => void,
  onClickRemoveQuizQuestion: (quizId: number, questionId: string) => void,
  onFileUploaded: (parameter1: number, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  onFileUploadCancelled: (paramater: number) => void,
  handleRemoveSection: (parameter: number) => void,
}

export default class CourseFormSection extends React.Component<Props> {
  abortController: AbortController;

  fileInputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.abortController = new AbortController();
    this.fileInputRef = createRef();
  }

  componentWillUnmount(): void {
    const { uploadProgress } = this.props.section;

    if (uploadProgress && uploadProgress !== 1) {
      this.onClickCancelFileUpload();
    }
  }

  cancelUploadRequest = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = "";
    }

    this.abortController.abort();
    this.abortController = new AbortController();
  };

  handleFileUploaded = (sectionId: number, videoUrl: string) => {
    const { onFileUploaded } = this.props;

    this.abortController = new AbortController();

    onFileUploaded(sectionId, videoUrl);
  };

  onClickCancelFileUpload = () => {
    const { onFileUploadCancelled, section } = this.props;

    this.cancelUploadRequest();
    onFileUploadCancelled(section.id);
  };

  onClickRemoveSection = () => {
    const { handleRemoveSection, section } = this.props;

    this.cancelUploadRequest();
    handleRemoveSection(section.id);
  };

  render() {
    const {
      section,
      isEditing,
      isLastSection,
      canRemoveVideoSection,
      onChangeSectionTitle,
      onHandleUpdateQuiz,
      handleRemoveSection,
      onFileUploadProgress,
      onClickAddNewQuizQuestion,
      onHandleAddNewQuizAnswer,
      onClickRemoveQuizQuestion,
    } = this.props;

    if (section.videoUrl === undefined) {
      return (
        <>
          <QuizSection
            section={section}
            isEditing={isEditing}
            onHandleUpdateQuiz={onHandleUpdateQuiz}
            onHandleAddNewQuizAnswer={onHandleAddNewQuizAnswer}
            handleRemoveSection={handleRemoveSection}
            onClickRemoveQuizQuestion={onClickRemoveQuizQuestion} />
          <AddMoreInputs
            title="Add quiz question"
            onClick={() => onClickAddNewQuizQuestion(section.id)}
            marginBottom="mb-5" />
          {!isLastSection
            ? <hr />
            : null
          }
        </>
      );
    }

    return (
      <VideoSection
        section={section}
        isLastSection={isLastSection}
        canRemoveVideoSection={canRemoveVideoSection}
        abortController={this.abortController}
        fileInputRef={this.fileInputRef}
        onChangeSectionTitle={onChangeSectionTitle}
        handleFileUploaded={this.handleFileUploaded}
        onFileUploadProgress={onFileUploadProgress}
        onClickCancelFileUpload={this.onClickCancelFileUpload}
        onClickRemoveSection={this.onClickRemoveSection} />
    );
  }
}

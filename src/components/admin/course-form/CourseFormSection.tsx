import { AxiosProgressEvent } from "axios";
import React, { createRef } from "react";
import AddMoreInputs from "src/components/AddMoreInputs";

import MoveSection from "./MoveSection";
import QuizSection from "./QuizSection";
import { MoveSectionFn, isQuizSection } from "./utils";
import VideoSection from "./VideoSection";
import { CourseQuizQuestion, CourseSection, ID } from "../../../types/index";

interface Props {
  section: CourseSection;
  isFirstSection: boolean;
  isLastSection: boolean;
  isEditing: boolean;
  canRemoveVideoSection: boolean;
  onChangeSectionTitle: (sectionId: ID, inputValue: string) => void;
  onHandleUpdateQuiz: (
    quizId: ID,
    quizQuestionsAndAnswers: CourseQuizQuestion[],
  ) => void;
  onClickAddNewQuizQuestion: (quizId: ID | string) => void;
  onHandleAddNewQuizAnswer: (
    quizId: ID,
    updatedQuizQuestions: CourseQuizQuestion[],
  ) => void;
  onClickRemoveQuizQuestion: (quizId: ID, questionId: string) => void;
  onFileUploaded: (sectionId: ID, videoUrl: string) => void;
  onFileUploadProgress: (data: AxiosProgressEvent, sectionId: ID) => void;
  onFileUploadCancelled: (sectionId: ID) => void;
  handleRemoveSection: (sectionId: ID) => void;
  onMoveSection: MoveSectionFn;
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
    const {
      section: { uploadProgress },
    } = this.props;

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

  handleFileUploaded = (sectionId: ID, videoUrl: string) => {
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
      isFirstSection,
      isLastSection,
      canRemoveVideoSection,
      onChangeSectionTitle,
      onHandleUpdateQuiz,
      handleRemoveSection,
      onFileUploadProgress,
      onClickAddNewQuizQuestion,
      onHandleAddNewQuizAnswer,
      onClickRemoveQuizQuestion,
      onMoveSection,
    } = this.props;

    if (isQuizSection(section)) {
      return (
        <>
          <QuizSection
            section={section}
            isEditing={isEditing}
            onHandleUpdateQuiz={onHandleUpdateQuiz}
            onHandleAddNewQuizAnswer={onHandleAddNewQuizAnswer}
            handleRemoveSection={handleRemoveSection}
            onClickRemoveQuizQuestion={onClickRemoveQuizQuestion}
          />
          <AddMoreInputs
            title="Add quiz question"
            onClick={() => onClickAddNewQuizQuestion(section.id)}
            marginBottom="mb-5"
          />

          <MoveSection
            sectionId={section.id}
            isFirst={isFirstSection}
            isLast={isLastSection}
            onMoveSection={onMoveSection}
          />

          <hr />
        </>
      );
    }

    return (
      <>
        <VideoSection
          section={section}
          canRemoveVideoSection={canRemoveVideoSection}
          abortController={this.abortController}
          fileInputRef={this.fileInputRef}
          onChangeSectionTitle={onChangeSectionTitle}
          handleFileUploaded={this.handleFileUploaded}
          onFileUploadProgress={onFileUploadProgress}
          onClickCancelFileUpload={this.onClickCancelFileUpload}
          onClickRemoveSection={this.onClickRemoveSection}
        />

        <MoveSection
          sectionId={section.id}
          isFirst={isFirstSection}
          isLast={isLastSection}
          onMoveSection={onMoveSection}
        />

        <hr />
      </>
    );
  }
}

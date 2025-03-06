import { AxiosProgressEvent } from "axios";
import React from "react";
import AddMoreInputs from "src/components/AddMoreInputs";
import { useFileUpload } from "src/hooks/useFileUpload";

import MoveSection from "./MoveSection";
import QuizSection from "./QuizSection";
import { MoveSectionFn, isQuizSection } from "./utils";
import VideoSection from "./VideoSection";
import { CourseQuizQuestion, CourseSection, ID } from "../../../types/index";

interface Props {
  section: CourseSection;
  courseId: ID;
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
  onVideoFileUploaded: (sectionId: ID, videoUrl: string) => void;
  onVideoFileUploadProgress: (data: AxiosProgressEvent, sectionId: ID) => void;
  onVideoFileUploadCancelled: (sectionId: ID) => void;
  handleRemoveSection: (sectionId: ID) => void;
  onMoveSection: MoveSectionFn;
}

const CourseFormSection: React.FC<Props> = ({
  section,
  courseId,
  isFirstSection,
  isLastSection,
  isEditing,
  canRemoveVideoSection,
  onChangeSectionTitle,
  onHandleUpdateQuiz,
  onClickAddNewQuizQuestion,
  onHandleAddNewQuizAnswer,
  onClickRemoveQuizQuestion,
  onVideoFileUploaded,
  onVideoFileUploadProgress,
  onVideoFileUploadCancelled,
  handleRemoveSection,
  onMoveSection,
}) => {
  const {
    abortController,
    fileInputRef,
    handleFileUploaded,
    handleCancelFileUpload,
    cancelUploadRequest,
  } = useFileUpload(
    section.id,
    section.uploadProgress,
    onVideoFileUploaded,
    onVideoFileUploadCancelled,
  );

  const onClickRemoveSection = () => {
    cancelUploadRequest();
    handleRemoveSection(section.id);
  };

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
        courseId={courseId}
        canRemoveVideoSection={canRemoveVideoSection}
        abortController={abortController}
        fileInputRef={fileInputRef}
        onChangeSectionTitle={onChangeSectionTitle}
        handleFileUploaded={handleFileUploaded}
        onVideoFileUploadProgress={onVideoFileUploadProgress}
        onClickCancelFileUpload={handleCancelFileUpload}
        onClickRemoveSection={onClickRemoveSection}
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
};

export default CourseFormSection;

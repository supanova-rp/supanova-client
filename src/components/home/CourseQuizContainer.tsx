import { useState } from "react";
import { feedbackMessages } from "src/constants/constants";
import {
  getQuizProgressInitialState,
  setQuizProgress,
} from "src/utils/course-utils";

import CourseSectionContainer from "./CourseSectionContainer";
import useUpdateProgress from "./hooks/useUpdateProgress";
import Quiz from "./Quiz";
import {
  ChangeDirection,
  CourseQuizSection,
  ID,
  QuizProgressState,
} from "../../types/index";

interface Props {
  courseId: ID;
  canGoBack: boolean;
  isLastSection: boolean;
  isCurrentSectionCompleted: boolean;
  courseCompleteLoading: boolean;
  courseTitle: string;
  quizSection: CourseQuizSection;
  refetchProgress: (shouldLoad?: boolean) => void;
  onChangeSection: (direction: ChangeDirection) => void;
  onCourseComplete: () => void;
  onClickBackChevron: () => void;
}

export const CourseQuizContainer: React.FC<Props> = ({
  courseId,
  canGoBack,
  courseTitle,
  isLastSection,
  isCurrentSectionCompleted,
  courseCompleteLoading,
  quizSection,
  refetchProgress,
  onChangeSection,
  onCourseComplete,
  onClickBackChevron,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<QuizProgressState>(
    getQuizProgressInitialState(quizSection),
  );

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [allAnswersAreCorrect, setAllAnswersAreCorrect] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSectionComplete = () => {
    if (isLastSection) {
      onCourseComplete();
    } else {
      onChangeSection("next");
    }
  };

  const onCloseModal = () => {
    setScore(null);
    setShowFeedbackModal(false);
    setAllAnswersAreCorrect(false);
  };

  const onUpdateProgressSuccess = () => {
    refetchProgress(false);
    handleSectionComplete();
  };

  const onUpdateProgressError = () => {
    onCloseModal();
  };

  const { loading, error, requestUpdateProgress } = useUpdateProgress(
    courseId,
    onUpdateProgressSuccess,
    onUpdateProgressError,
  );

  const onChangeAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    let currentSelectedAnswers = updatedSelectedAnswers[questionIndex];

    // If it is single answer only - deselect everything except the answerIndex answer
    if (!quizSection.questions[questionIndex].isMultiAnswer) {
      currentSelectedAnswers = currentSelectedAnswers.filter(
        (index: any) => index === answerIndex,
      );
    }

    if (currentSelectedAnswers.includes(answerIndex)) {
      // Deselect the answer if already selected
      updatedSelectedAnswers[questionIndex] = currentSelectedAnswers.filter(
        (index: any) => index !== answerIndex,
      );
    } else {
      // Select the answer if not selected
      updatedSelectedAnswers[questionIndex] = [
        ...currentSelectedAnswers,
        answerIndex,
      ];
    }

    setSelectedAnswers(updatedSelectedAnswers);

    // Update local storage
    setQuizProgress(quizSection.id, updatedSelectedAnswers);
  };

  const calculateScore = () => {
    let correctAnswersCount = 0;

    quizSection.questions.forEach((question, questionIndex) => {
      const selectedAnswerIndices = selectedAnswers[questionIndex];
      const correctAnswerIndices = question.answers
        .map((answer, index) => (answer.isCorrectAnswer ? index : null))
        .filter(index => index !== null);

      if (
        correctAnswerIndices.every(index =>
          selectedAnswerIndices.includes(index),
        ) &&
        correctAnswerIndices.length === selectedAnswerIndices.length
      ) {
        correctAnswersCount++;
      }
    });

    return correctAnswersCount;
  };

  const onSubmitQuiz = () => {
    const correctAnswersCount = calculateScore();
    const totalQuestions = quizSection.questions.length;

    setAllAnswersAreCorrect(correctAnswersCount === totalQuestions);

    setScore(correctAnswersCount);
    setShowFeedbackModal(true);
  };

  const onClickModalConfirm = () => {
    if (allAnswersAreCorrect) {
      if (isCurrentSectionCompleted) {
        handleSectionComplete(); // no need to update progress
      } else {
        requestUpdateProgress(quizSection.id);
      }
    } else {
      onCloseModal();
    }
  };

  return (
    <CourseSectionContainer
      canGoBack={canGoBack}
      courseTitle={courseTitle}
      continueText="Submit"
      className="quiz-container"
      onChangeSection={onChangeSection}
      onClickContinue={onSubmitQuiz}
      onClickBackChevron={onClickBackChevron}
      loading={loading || courseCompleteLoading}
      error={error ? feedbackMessages.genericErrorTryAgain : undefined}
    >
      <Quiz
        quizSection={quizSection}
        score={score}
        allAnswersAreCorrect={allAnswersAreCorrect}
        selectedAnswers={selectedAnswers}
        showFeedbackModal={showFeedbackModal}
        isLastSection={isLastSection}
        loading={loading || courseCompleteLoading}
        onChangeAnswer={onChangeAnswer}
        onClickModalConfirm={onClickModalConfirm}
      />
    </CourseSectionContainer>
  );
};

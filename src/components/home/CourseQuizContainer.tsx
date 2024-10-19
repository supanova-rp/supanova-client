import { useState } from "react";
import { feedbackMessages } from "src/constants/constants";

import CourseSectionContainer from "./CourseSectionContainer";
import useUpdateProgress from "./hooks/useUpdateProgress";
import Quiz from "./Quiz";
import { ChangeDirection, CourseQuizSection } from "../../types/index";

interface Props {
  courseId: number;
  canGoBack: boolean;
  isLastSection: boolean;
  courseTitle: string;
  currentSectionIndex: number;
  currentSectionProgressIndex: number;
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
  currentSectionIndex,
  currentSectionProgressIndex,
  quizSection,
  refetchProgress,
  onChangeSection,
  onCourseComplete,
  onClickBackChevron,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(quizSection.questions.length).fill([]),
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

  const onUpdateProgressSuccess = () => {
    refetchProgress(false);
    handleSectionComplete();
  };

  const { loading, error, requestUpdateProgress } = useUpdateProgress(
    courseId,
    onUpdateProgressSuccess,
  );

  const onChangeAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    const currentSelectedAnswers = updatedSelectedAnswers[questionIndex];

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

  const onCloseModal = () => {
    setScore(null);
    setShowFeedbackModal(false);
    setAllAnswersAreCorrect(false);
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
      if (currentSectionProgressIndex <= currentSectionIndex) {
        requestUpdateProgress(currentSectionIndex + 1);
      } else {
        handleSectionComplete();
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
      // TODO: should loading be on the modal for quizzes instead?
      loading={loading}
      error={error ? feedbackMessages.genericErrorTryAgain : undefined}
    >
      <Quiz
        quizSection={quizSection}
        score={score}
        allAnswersAreCorrect={allAnswersAreCorrect}
        selectedAnswers={selectedAnswers}
        showFeedbackModal={showFeedbackModal}
        isLastSection={isLastSection}
        onChangeAnswer={onChangeAnswer}
        onClickModalConfirm={onClickModalConfirm}
      />
    </CourseSectionContainer>
  );
};

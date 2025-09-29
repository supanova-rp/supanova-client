import * as Sentry from "@sentry/browser";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  feedbackMessages,
  REACT_TOAST_DURATION,
} from "src/constants/constants";
import { useLazyQuery } from "src/hooks/useLazyQuery";
import { useQuery } from "src/hooks/useQuery";

import CourseSectionContainer from "./CourseSectionContainer";
import useUpdateProgress from "./hooks/useUpdateProgress";
import Quiz from "./Quiz";
import {
  ChangeDirection,
  CourseQuizSection,
  ID,
  QuizProgressState,
  QuizStateResponse,
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

type QuizResult = {
  score: number;
  incorrectIds: string[];
};

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
    new Array(quizSection.questions.length).fill([])
  );

  const [attempts, setAttempts] = useState(0);
  const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<string[]>(
    []
  );

  const { request: incrementAttempts } = useLazyQuery<null>(
    "/increment-attempts"
  );

  const { loading: loadingQuizState } = useQuery<QuizStateResponse>(
    "/get-quiz-state",
    {
      requestBody: {
        quizId: quizSection.id,
      },
      onSuccess: (res) => {
        if (res?.quizState) {
          setSelectedAnswers(res.quizState);
        }
        if (res?.attempts) {
          setAttempts(res.attempts);
        }
      },
      onError: (error) => {
        Sentry.captureException(error);
        toast.error(feedbackMessages.quizStateLoadError, REACT_TOAST_DURATION);
      },
    }
  );

  const { request: saveQuizState } = useLazyQuery<null>("/set-quiz-state");

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
    onUpdateProgressError
  );

  const onChangeAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    let currentSelectedAnswers = updatedSelectedAnswers[questionIndex];

    // If it is single answer only - deselect everything except the answerIndex answer
    if (!quizSection.questions[questionIndex].isMultiAnswer) {
      currentSelectedAnswers = currentSelectedAnswers.filter(
        (index: any) => index === answerIndex
      );
    }

    if (currentSelectedAnswers.includes(answerIndex)) {
      // Deselect the answer if already selected
      updatedSelectedAnswers[questionIndex] = currentSelectedAnswers.filter(
        (index: any) => index !== answerIndex
      );
    } else {
      // Select the answer if not selected
      updatedSelectedAnswers[questionIndex] = [
        ...currentSelectedAnswers,
        answerIndex,
      ];
    }

    setSelectedAnswers(updatedSelectedAnswers);

    saveQuizState({
      quizId: quizSection.id,
      quizState: JSON.stringify(updatedSelectedAnswers),
    });
  };

  const calculateQuizResult = (): QuizResult => {
    let correctAnswersCount = 0;
    const incorrectIds: string[] = [];

    quizSection.questions.forEach((question, questionIndex) => {
      const selectedAnswerIndices = selectedAnswers[questionIndex];
      const correctAnswerIndices = question.answers
        .map((answer, index) => (answer.isCorrectAnswer ? index : null))
        .filter((index) => index !== null);

      if (
        correctAnswerIndices.every((index) =>
          selectedAnswerIndices.includes(index)
        ) &&
        correctAnswerIndices.length === selectedAnswerIndices.length
      ) {
        correctAnswersCount++;
      } else {
        incorrectIds.push(question.id);
      }
    });

    return {
      score: correctAnswersCount,
      incorrectIds,
    };
  };

  const onSubmitQuiz = () => {
    const quizResult = calculateQuizResult();
    const totalQuestions = quizSection.questions.length;

    setAllAnswersAreCorrect(quizResult.score === totalQuestions);

    setScore(quizResult.score);
    setShowFeedbackModal(true);
    setAttempts((a) => a + 1);
    setIncorrectQuestionIds(quizResult.incorrectIds);

    incrementAttempts({
      quizId: quizSection.id,
    });
  };

  const handleClickSubmitQuiz = () => {
    // Skip submission and just go to next section if already completed
    if (isCurrentSectionCompleted) {
      handleSectionComplete();
    } else {
      onSubmitQuiz();
    }
  };

  const onClickModalConfirm = () => {
    if (allAnswersAreCorrect) {
      requestUpdateProgress(quizSection.id);
    } else {
      onCloseModal();
    }
  };

  return (
    <CourseSectionContainer
      canGoBack={canGoBack}
      courseTitle={courseTitle}
      continueText={isCurrentSectionCompleted ? "Continue" : "Submit"}
      className="quiz-container"
      onChangeSection={onChangeSection}
      onClickContinue={handleClickSubmitQuiz}
      onClickBackChevron={onClickBackChevron}
      loading={loading || courseCompleteLoading}
      loadingContinue={loadingQuizState}
      error={error ? feedbackMessages.genericErrorTryAgain : undefined}
    >
      <Quiz
        quizSection={quizSection}
        score={score}
        attempts={attempts}
        incorrectQuestionIds={incorrectQuestionIds}
        allAnswersAreCorrect={allAnswersAreCorrect}
        selectedAnswers={selectedAnswers}
        disabled={isCurrentSectionCompleted}
        showFeedbackModal={showFeedbackModal}
        isLastSection={isLastSection}
        loading={loading || courseCompleteLoading}
        onChangeAnswer={onChangeAnswer}
        onClickModalConfirm={onClickModalConfirm}
      />
    </CourseSectionContainer>
  );
};

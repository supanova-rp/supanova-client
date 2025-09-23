import React from "react";
import { CourseQuizSection } from "src/types";

import QuizAnswer from "./QuizAnswer";
import Modal from "../modals/Modal";

interface Props {
  quizSection: CourseQuizSection;
  selectedAnswers: any[];
  score: number | null;
  attempts: number;
  incorrectQuestionIds: string[];
  showFeedbackModal: boolean;
  allAnswersAreCorrect: boolean;
  isLastSection: boolean;
  loading: boolean;
  disabled?: boolean;
  onChangeAnswer: (questionIndex: number, answerIndex: number) => void;
  onClickModalConfirm: () => void;
}

const Quiz: React.FC<Props> = ({
  quizSection,
  selectedAnswers,
  score,
  attempts,
  incorrectQuestionIds,
  showFeedbackModal,
  allAnswersAreCorrect,
  isLastSection,
  loading,
  disabled = false,
  onChangeAnswer,
  onClickModalConfirm,
}) => {
  const totalQuestions = quizSection.questions.length;

  const getFeedbackButtonText = () => {
    if (!allAnswersAreCorrect) {
      return "Try again";
    }

    return "Continue";
  };

  const getFeedbackText = () => {
    if (!allAnswersAreCorrect) {
      if (attempts > 1) {
        return "Check which questions you answered incorrectly - they have been highlighted in red";
      }

      return "If unsure on a question have a look in the course notes or revisit the video";
    }

    return isLastSection
      ? "You got everything correct!"
      : "You got everything correct! Continue to the next section of the course.";
  };

  return (
    <div className="mb-4">
      <div>
        <h4 className="mt-2 mb-4">Quiz</h4>
        {quizSection.questions.map((question, questionIndex) => {
          const highlightIncorrect =
            attempts > 1 && incorrectQuestionIds.includes(question.id);

          return (
            <div
              key={question.id}
              className={`quiz-question ${highlightIncorrect ? "highlight-incorrect" : ""}`}
            >
              <h5 className="question-text-container">
                <span className="mt-2 mb-4 question-text">
                  {questionIndex + 1}. {question.question}
                </span>
              </h5>
              {question.answers.map((answer, answerIndex) => (
                <QuizAnswer
                  key={answer.id}
                  answer={answer}
                  answerIndex={answerIndex}
                  disabled={disabled}
                  questionIndex={questionIndex}
                  selectedAnswers={selectedAnswers}
                  onClickAnswer={onChangeAnswer}
                />
              ))}
            </div>
          );
        })}
      </div>
      {showFeedbackModal && score !== null ? (
        <Modal
          confirmText={getFeedbackButtonText()}
          loading={loading}
          onClickConfirm={onClickModalConfirm}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h5 className="pb-3">
              {score} / {totalQuestions}
            </h5>
            <div>
              <h5 className="text-center">{getFeedbackText()}</h5>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Quiz;

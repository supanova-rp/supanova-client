import React from "react";
import { CourseQuizSection } from "src/types";
import Modal from "../modals/Modal";
import QuizAnswer from "./QuizAnswer";

interface Props {
  quizSection: CourseQuizSection,
  selectedAnswers: any[],
  score: number | null,
  showFeedbackModal: boolean,
  allAnswersAreCorrect: boolean,
  isLastSection: boolean,
  onChangeAnswer: (questionIndex: number, answerIndex: number) => void,
  onClickModalConfirm: () => void,
}

const Quiz: React.FC<Props> = ({
  quizSection,
  selectedAnswers,
  score,
  showFeedbackModal,
  allAnswersAreCorrect,
  isLastSection,
  onChangeAnswer,
  onClickModalConfirm,
}) => {
  const totalQuestions = quizSection.questions.length;

  const getFeedbackButtonText = () => {
    if (!allAnswersAreCorrect) {
      return "Try again";
    }

    return isLastSection ? "Finish" : "Continue";
  };

  const getFeedbackText = () => {
    if (!allAnswersAreCorrect) {
      return "Try again to get all the correct answers before continuing with the course";
    }

    return isLastSection
      ? "You got everything correct! Congratulations, you have completed the course!"
      : "You got everything correct! Continue to the next section of the course.";
  };

  return (
    <div className="mb-4">
      <div>
        <h4 className="mt-2 mb-4">Quiz</h4>
        {quizSection.questions.map((question, questionIndex) => (
          <div
            key={question.id}
            className="quiz-question">
            <h5 className="mt-2 mb-4">{questionIndex + 1}. {question.question}</h5>
            {question.answers.map((answer, answerIndex) => (
              <QuizAnswer
                key={answer.id}
                answer={answer}
                answerIndex={answerIndex}
                questionIndex={questionIndex}
                selectedAnswers={selectedAnswers}
                onClickAnswer={onChangeAnswer} />
            ))}
          </div>
        ))}
      </div>
      {showFeedbackModal && score !== null && (
        <Modal
          confirmText={getFeedbackButtonText()}
          onClickConfirm={onClickModalConfirm}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h5 className="pb-3">
              {score} / {totalQuestions}
            </h5>
            <div>
              <h5 className="text-center">
                {getFeedbackText()}
              </h5>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Quiz;

import React from "react";
import { ReactComponent as ChevronLeft } from "src/icons/chevronLeft.svg";
import Header from "./Header";
import { colors } from "src/constants/colorPalette";
import { CourseQuizSection } from "src/types";
import Modal from "../modals/Modal";

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
          <div key={question.id}>
            <h5 className="mt-2 mb-4">{question.question}</h5>
            {question.answers.map((answer, answerIndex) => (
              <div
                key={answer.id}
                className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`question-${questionIndex}-answer-${answerIndex}`}
                  checked={selectedAnswers[questionIndex].includes(answerIndex)}
                  onChange={() => onChangeAnswer(questionIndex, answerIndex)}/>
                <label
                  className="form-check-label"
                  htmlFor={`question-${questionIndex}-answer-${answerIndex}`}>
                  {answer.answer}
                </label>
              </div>
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

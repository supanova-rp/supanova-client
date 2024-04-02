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
  onChangeAnswer: (questionIndex: number, answerIndex: number) => void,
  onClickModalConfirm: () => void,
}

const Quiz: React.FC<Props> = ({
  quizSection,
  selectedAnswers,
  score,
  showFeedbackModal,
  allAnswersAreCorrect,
  onChangeAnswer,
  onClickModalConfirm,
}) => {
  const totalQuestions = quizSection.questions.length;

  return (
    <div className="mb-4 ms-4">
      <div>
        <div className="d-flex align-items-center">
          <div role="button">
            <ChevronLeft
              stroke={colors.orange}
              className="mt-4 me-1" />
          </div>
          <Header title="Quiz" />
        </div>
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
          confirmText={allAnswersAreCorrect ? "Continue" : "Try again"}
          onClickConfirm={onClickModalConfirm}>
          <>
            <div className={score === totalQuestions ? "text-success" : "text-danger"}>
              {score === totalQuestions ? "✔" : "✘"}
            </div>
            <div>
              <p>
                {score}/{totalQuestions} answered correctly!
              </p>
              {allAnswersAreCorrect
                ? (
                  <p>
                    You got everything correct! Continue to the next section of the course.
                  </p>
                )
                : (
                  <p>
                    Try again to get the correct answers before continuing to the next section of the course
                  </p>
                )
              }
            </div>
          </>
        </Modal>
      )}
    </div>
  );
};

export default Quiz;

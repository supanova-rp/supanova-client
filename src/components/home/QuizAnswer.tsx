import React, { useRef } from "react";
import { CourseQuizAnswer } from "src/types";

interface Props {
  answer: CourseQuizAnswer,
  answerIndex: number,
  questionIndex: number,
  onClickAnswer: (questionIndex: number, answerIndex: number) => void,
}

const QuizAnswer: React.FC<Props> = ({
  answer,
  answerIndex,
  questionIndex,
  onClickAnswer,
}) => {
  const checkboxRef = useRef<HTMLInputElement>();

  const handleClickAnswer = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
    }

    onClickAnswer(questionIndex, answerIndex);
  };

  return (
    <div
      className="quiz-answer form-check"
      onClick={handleClickAnswer}>
      <input
        type="checkbox"
        className="form-check-input"
        id={`question-${questionIndex}-answer-${answerIndex}`}
        ref={checkboxRef} />
      <p
        className="form-check-label">
        {answer.answer}
      </p>
    </div>
  );
};

export default QuizAnswer;

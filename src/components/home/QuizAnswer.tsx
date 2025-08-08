import React from "react";
import { CourseQuizAnswer } from "src/types";

interface Props {
  answer: CourseQuizAnswer;
  answerIndex: number;
  questionIndex: number;
  disabled: boolean;
  selectedAnswers: any[];
  onClickAnswer: (questionIndex: number, answerIndex: number) => void;
}

const QuizAnswer: React.FC<Props> = ({
  answer,
  answerIndex,
  questionIndex,
  disabled,
  selectedAnswers,
  onClickAnswer,
}) => {
  const handleClickAnswer = () => {
    if (!disabled) {
      onClickAnswer(questionIndex, answerIndex);
    }
  };

  const selectedClass = selectedAnswers[questionIndex].includes(answerIndex)
    ? "quiz-answer-selected"
    : "";

  const disabledClass = disabled ? "disabled" : "";

  return (
    <div
      className={`quiz-answer ${selectedClass} ${disabledClass}`}
      onClick={handleClickAnswer}
    >
      <span>{answer.answer}</span>
    </div>
  );
};

export default QuizAnswer;

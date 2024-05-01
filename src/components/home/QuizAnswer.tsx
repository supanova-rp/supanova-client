import React from "react";
import { CourseQuizAnswer } from "src/types";
import Checkbox from "../Checkbox";

interface Props {
  answer: CourseQuizAnswer,
  answerIndex: number,
  questionIndex: number,
  selectedAnswers: any[],
  onClickAnswer: (questionIndex: number, answerIndex: number) => void,
}

const QuizAnswer: React.FC<Props> = ({
  answer,
  answerIndex,
  questionIndex,
  selectedAnswers,
  onClickAnswer,
}) => {
  const handleClickAnswer = () => {
    onClickAnswer(questionIndex, answerIndex);
  };

  const selectedClass = selectedAnswers[questionIndex].includes(answerIndex) ? "quiz-answer-selected" : "";

  return (
    <div
      className={`quiz-answer ${selectedClass}`}
      onClick={handleClickAnswer}>
      <span>{answer.answer}</span>
    </div>
  );
};

export default QuizAnswer;

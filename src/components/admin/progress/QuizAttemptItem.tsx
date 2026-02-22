import { useState } from "react";
import CheckIcon from "src/assets/icons/checkIcon.svg?react";
import XMarkIcon from "src/assets/icons/xMarkIcon.svg?react";
import ExpandCollapseButton from "src/components/ExpandCollapseButton";
import { QuizAttemptAnswers } from "src/types";

type AnswerInfo = { text: string; position: number; isCorrectAnswer: boolean };

type QuestionInfo = {
  text: string;
  position: number;
  answerMap: Map<string, AnswerInfo>;
};

export type QuestionMap = Map<string, QuestionInfo>;

type Props = {
  label: string;
  answers: QuizAttemptAnswers[];
  showAll?: boolean;
  questionMap: QuestionMap;
};

const QuizAttemptItem = ({ label, answers, showAll, questionMap }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedAnswers = showAll ? answers : answers.filter(a => !a.correct);

  const sortByPosition = (items: QuizAttemptAnswers[]) =>
    [...items].sort((a, b) => {
      const posA = questionMap.get(a.questionID)?.position ?? 0;
      const posB = questionMap.get(b.questionID)?.position ?? 0;
      return posA - posB;
    });

  const getQuestionText = (questionID: string) =>
    questionMap.get(questionID)?.text ?? questionID;

  const getAllAnswers = (questionID: string) => {
    const question = questionMap.get(questionID);
    if (!question) {
      return [];
    }

    return [...question.answerMap.entries()]
      .sort(([, a], [, b]) => a.position - b.position)
      .map(([id, info]) => ({
        id,
        text: info.text,
        isCorrectAnswer: info.isCorrectAnswer,
      }));
  };

  return (
    <div className="quiz-attempt-item">
      <ExpandCollapseButton
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <span>{label}</span>
      </ExpandCollapseButton>
      {isExpanded ? (
        <div className="quiz-attempt-questions">
          {sortByPosition(displayedAnswers).map(attemptAnswer => {
            const allAnswers = getAllAnswers(attemptAnswer.questionID);
            const selectedSet = new Set(attemptAnswer.selectedAnswerIDs);

            return (
              <div
                key={attemptAnswer.questionID}
                className="quiz-attempt-question"
              >
                <span className="quiz-attempt-question-text">
                  {getQuestionText(attemptAnswer.questionID)}
                </span>
                {!attemptAnswer.correct && <XMarkIcon width={14} height={14} />}
                <ul className="quiz-attempt-answer-list">
                  {allAnswers.map(answer => (
                    <li
                      key={answer.id}
                      className={`quiz-attempt-answer ${selectedSet.has(answer.id) ? "selected" : ""} ${answer.isCorrectAnswer ? "correct" : ""}`}
                    >
                      {selectedSet.has(answer.id) && answer.isCorrectAnswer ? (
                        <CheckIcon stroke="green" width={16} height={16} />
                      ) : null}
                      {selectedSet.has(answer.id) &&
                        !answer.isCorrectAnswer && (
                          <XMarkIcon stroke="red" width={16} height={16} />
                        )}
                      {answer.text}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default QuizAttemptItem;

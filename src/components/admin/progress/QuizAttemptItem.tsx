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

  const getQuestionInfo = (questionID: string) => {
    const question = questionMap.get(questionID);
    return {
      text: question?.text ?? questionID,
      position: question?.position ?? 0,
    };
  };

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

  const allCorrect = answers.every(a => a.correct);

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
          {allCorrect ? (
            <div className="quiz-attempt-all-correct">
              <CheckIcon stroke="green" width={16} height={16} />
              <span>All questions were answered correctly</span>
            </div>
          ) : null}
          {!allCorrect &&
            sortByPosition(displayedAnswers).map(attemptAnswer => {
              const allAnswers = getAllAnswers(attemptAnswer.questionID);
              const selectedSet = new Set(attemptAnswer.selectedAnswerIDs);
              const { text: questionText, position: questionPosition } =
                getQuestionInfo(attemptAnswer.questionID);

              return (
                <div
                  key={attemptAnswer.questionID}
                  className="quiz-attempt-question"
                >
                  <div className="quiz-attempt-question-text">
                    {`${questionPosition + 1}. ${questionText}`}
                  </div>
                  <ul className="quiz-attempt-answer-list">
                    {allAnswers.map(answer => (
                      <li
                        key={answer.id}
                        className={`quiz-attempt-answer ${selectedSet.has(answer.id) ? "selected" : ""} ${answer.isCorrectAnswer ? "correct" : ""}`}
                      >
                        {selectedSet.has(answer.id) &&
                        answer.isCorrectAnswer ? (
                          <CheckIcon stroke="green" width={16} height={16} />
                        ) : null}
                        {selectedSet.has(answer.id) &&
                          !answer.isCorrectAnswer && (
                            <XMarkIcon
                              stroke="red"
                              strokeWidth={2}
                              width={18}
                              height={18}
                            />
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

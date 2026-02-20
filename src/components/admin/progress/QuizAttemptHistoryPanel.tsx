import { useState } from "react";
import { Button } from "react-bootstrap";
import { QuizAttempt } from "src/types";

type Props = {
  attempts: QuizAttempt[];
};

const QuizAttemptHistoryPanel = ({ attempts }: Props) => {
  const [expandedAttempts, setExpandedAttempts] = useState<Set<number>>(
    new Set(),
  );

  const toggleAttempt = (attemptNumber: number) => {
    setExpandedAttempts(prev => {
      const next = new Set(prev);
      if (next.has(attemptNumber)) {
        next.delete(attemptNumber);
      } else {
        next.add(attemptNumber);
      }

      return next;
    });
  };

  return (
    <ul className="quiz-attempt-list">
      {attempts.map(attempt => {
        const isExpanded = expandedAttempts.has(attempt.attemptNumber);
        return (
          <li key={attempt.attemptNumber} className="quiz-attempt-item">
            <Button
              variant="link"
              className="nav-link quiz-attempt-header"
              onClick={() => toggleAttempt(attempt.attemptNumber)}
            >
              Attempt {attempt.attemptNumber}
            </Button>
            {isExpanded ? (
              <ul className="quiz-attempt-questions">
                {attempt.attemptData.questions.map(question => (
                  <li
                    key={question.questionID}
                    className="quiz-attempt-question"
                  >
                    <span className="quiz-attempt-question-id">
                      {question.questionID}
                    </span>
                    <span className="quiz-attempt-answers">
                      {question.selectedAnswerIDs.join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default QuizAttemptHistoryPanel;

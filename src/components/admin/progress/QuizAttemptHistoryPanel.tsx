import { useState } from "react";
import { Button } from "react-bootstrap";
import { QuizAttemptAnswers, QuizAttempt } from "src/types";

type Props = {
  attempts?: QuizAttempt[];
  currentAttempt?: QuizAttemptAnswers[];
};

const QuizAttemptHistoryPanel = ({ attempts, currentAttempt }: Props) => {
  const [currentAttemptExpanded, setCurrentAttemptExpanded] = useState(false);
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
      {currentAttempt ? (
        <li className="quiz-attempt-item">
          <Button
            variant="link"
            className="nav-link quiz-attempt-header"
            onClick={() => setCurrentAttemptExpanded(prev => !prev)}
          >
            Current attempt (in progress)
          </Button>
          {currentAttemptExpanded ? (
            <ul className="quiz-attempt-questions">
              {currentAttempt
                .filter(a => !a.correct)
                .map(answer => (
                  <li key={answer.questionID} className="quiz-attempt-question">
                    <span className="quiz-attempt-question-id">
                      {answer.questionID}
                    </span>
                    <span className="quiz-attempt-answers">
                      {answer.selectedAnswerIDs.join(", ")}
                    </span>
                  </li>
                ))}
            </ul>
          ) : null}
        </li>
      ) : null}
      {attempts?.map(attempt => {
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
                {attempt.answers
                  .filter(a => !a.correct)
                  .map(answer => (
                    <li
                      key={answer.questionID}
                      className="quiz-attempt-question"
                    >
                      <span className="quiz-attempt-question-id">
                        {answer.questionID}
                      </span>
                      <span className="quiz-attempt-answers">
                        {answer.selectedAnswerIDs.join(", ")}
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

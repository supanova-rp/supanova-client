import { useMemo } from "react";
import { QuizAttemptAnswers, QuizAttempt } from "src/types";
import { CourseQuizSectionServerModel } from "src/types/server";

import QuizAttemptItem, { QuestionMap } from "./QuizAttemptItem";

type Props = {
  attempts?: QuizAttempt[];
  currentAttempt?: QuizAttemptAnswers[];
  quizSection?: CourseQuizSectionServerModel;
};

const QuizAttemptHistoryPanel = ({
  attempts,
  currentAttempt,
  quizSection,
}: Props) => {
  const questionMap: QuestionMap = useMemo(() => {
    if (!quizSection) {
      return new Map();
    }

    return new Map(
      quizSection.questions.map(q => [
        q.id,
        {
          text: q.question,
          position: q.position,
          answerMap: new Map(
            q.answers.map(a => [
              a.id,
              {
                text: a.answer,
                position: a.position,
                isCorrectAnswer: a.isCorrectAnswer,
              },
            ]),
          ),
        },
      ]),
    );
  }, [quizSection]);

  const filteredCurrentAttempt = currentAttempt?.filter(
    a => a.selectedAnswerIDs.length > 0,
  );

  return (
    <div className="quiz-attempt-list">
      {filteredCurrentAttempt && filteredCurrentAttempt.length > 0 ? (
        <QuizAttemptItem
          label="Current attempt (in progress)"
          answers={filteredCurrentAttempt}
          showAll
          questionMap={questionMap}
        />
      ) : null}
      {filteredCurrentAttempt &&
      filteredCurrentAttempt.length > 0 &&
      attempts &&
      attempts.length > 0 ? (
        <hr className="quiz-attempt-divider" />
      ) : null}
      {attempts && attempts.length > 0 ? (
        <div className="quiz-attempt-label">
          <span className="quiz-attempt-label-title">Past attempts</span> (only
          incorrectly answered questions shown)
        </div>
      ) : null}
      {attempts?.map(attempt => (
        <QuizAttemptItem
          key={attempt.attemptNumber}
          label={`Attempt ${attempt.attemptNumber}`}
          answers={attempt.answers}
          questionMap={questionMap}
        />
      ))}
    </div>
  );
};

export default QuizAttemptHistoryPanel;

import { useMemo } from "react";
import { QuizAttempt, QuizAttemptAnswers } from "src/types";
import { CourseQuizSectionServerModel } from "src/types/server";

import QuizAttemptItem, { QuestionMap } from "./QuizAttemptItem";

type Props = {
  attempts?: QuizAttempt[];
  currentAnswers?: QuizAttemptAnswers[];
  quizSection?: CourseQuizSectionServerModel;
};

const QuizAttemptHistoryPanel = ({
  attempts,
  currentAnswers,
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

  return (
    <div className="quiz-attempt-list">
      {currentAnswers && currentAnswers.length > 0 ? (
        <QuizAttemptItem
          label="Current attempt (in progress)"
          answers={currentAnswers}
          showAll
          questionMap={questionMap}
        />
      ) : null}
      {currentAnswers &&
      currentAnswers.length > 0 &&
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

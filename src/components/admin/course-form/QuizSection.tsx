import uuid from "react-uuid";
import FormInput from "src/components/FormInput";
import RemoveInput from "src/components/RemoveInput";
import {
  CourseQuizAnswer,
  CourseQuizQuestion,
  CourseQuizSection,
  ID,
} from "src/types";

import QuizAnswers from "./QuizAnswers";

interface QuizSectionProps {
  section: CourseQuizSection;
  isEditing: boolean;
  onHandleUpdateQuiz: (
    quizId: ID,
    quizQuestionsAndAnswers: CourseQuizQuestion[],
  ) => void;
  onHandleAddNewQuizAnswer: (
    quizId: ID,
    updatedQuizQuestions: CourseQuizQuestion[],
  ) => void;
  onClickRemoveQuizQuestion: (quizId: ID, questionId: string) => void;
  handleRemoveSection: (quizId: ID) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  section,
  isEditing,
  onHandleAddNewQuizAnswer,
  handleRemoveSection,
  onClickRemoveQuizQuestion,
  onHandleUpdateQuiz,
}) => {
  const { id: quizId, questions } = section;

  const canRemoveQuizQuestion = section.questions.length > 1;

  const onChangeQuizQuestion = (questionId: string, inputValue: string) => {
    const updatedQuizQuestions = questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          question: inputValue,
        };
      }

      return question;
    });

    onHandleUpdateQuiz(quizId, updatedQuizQuestions);
  };

  const onChangeQuizAnswer = (
    inputValue: string,
    answerId: string,
    questionId: string,
  ) => {
    const updatedQuizQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedAnswers = question.answers.map(answer => {
          if (answer.id === answerId) {
            return {
              ...answer,
              answer: inputValue,
            };
          }

          return answer;
        });

        return {
          ...question,
          answers: updatedAnswers,
        };
      }

      return question;
    });

    onHandleUpdateQuiz(quizId, updatedQuizQuestions);
  };

  const onClickAddNewQuizAnswer = (questionId: string) => {
    const updatedQuizQuestions = questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          answers: [
            ...question.answers,
            {
              id: uuid(),
              answer: "",
              isNewAnswer: isEditing,
              isCorrectAnswer: false,
            },
          ],
        };
      }

      return question;
    });

    onHandleAddNewQuizAnswer(quizId, updatedQuizQuestions);
  };

  const updateQuestion = (
    questionId: string,
    updateFn: (question: CourseQuizQuestion) => CourseQuizQuestion,
  ) => {
    return section.questions.map((question: CourseQuizQuestion) => {
      if (question.id === questionId) {
        return updateFn(question);
      }

      return question;
    });
  };

  const onClickRemoveQuizAnswer = (answerId: string, questionId: string) => {
    const updatedQuizQuestions = updateQuestion(
      questionId,
      (question: CourseQuizQuestion) => {
        const updatedQuizAnswers = question.answers.filter(
          answer => answer.id !== answerId,
        );

        return {
          ...question,
          answers: updatedQuizAnswers,
        };
      },
    );

    onHandleUpdateQuiz(quizId, updatedQuizQuestions);
  };

  const onClickToggleCorrectQuizAnswer = (
    questionId: string,
    answerId: string,
    isCorrectAnswer: boolean,
  ) => {
    const updatedQuestionsAndAnswers = section.questions.map(
      (question: CourseQuizQuestion) => {
        if (question.id === questionId) {
          const updatedAnswers = question.answers.map(
            (answer: CourseQuizAnswer) => {
              if (answer.id === answerId) {
                return {
                  ...answer,
                  isCorrectAnswer: !isCorrectAnswer,
                };
              }

              return answer;
            },
          );

          return {
            ...question,
            answers: updatedAnswers,
          };
        }

        return question;
      },
    );

    onHandleUpdateQuiz(quizId, updatedQuestionsAndAnswers);
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <h6>Quiz</h6>
        <RemoveInput
          onClickFunction={() => handleRemoveSection(quizId)}
          padding="px-2"
          margin="0"
        />
      </div>
      {questions.map(({ id: questionId, question, answers }) => {
        return (
          <div key={`quiz-section-${questionId}`}>
            <div className="d-flex flex-row align-items-center">
              <FormInput
                formId={`quiz-section-${questionId}`}
                formGroupClassname="my-4 section-input"
                label="Question"
                type="text"
                value={question}
                onChange={e => onChangeQuizQuestion(questionId, e.target.value)}
              />

              {canRemoveQuizQuestion ? (
                <RemoveInput
                  onClickFunction={() =>
                    onClickRemoveQuizQuestion(quizId, questionId)
                  }
                  margin="ms-2 mb-3"
                  padding="pt-5 px-2"
                />
              ) : null}
            </div>
            <QuizAnswers
              answers={answers}
              canRemoveQuizAnswer={answers.length > 2}
              onChangeQuizAnswer={(inputValue, answerId) =>
                onChangeQuizAnswer(inputValue, answerId, questionId)
              }
              onClickAddNewQuizAnswer={() =>
                onClickAddNewQuizAnswer(questionId)
              }
              onClickRemoveQuizAnswer={answerId =>
                onClickRemoveQuizAnswer(answerId, questionId)
              }
              onClickToggleCorrectQuizAnswer={(answerId, isCorrectAnswer) =>
                onClickToggleCorrectQuizAnswer(
                  questionId,
                  answerId,
                  isCorrectAnswer,
                )
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default QuizSection;

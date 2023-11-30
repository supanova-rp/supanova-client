import { FormCheck, FormLabel } from "react-bootstrap";

import { CourseQuizAnswer } from "src/types";
import { ReactComponent as PlusIcon } from "src/icons/plusIcon.svg";
import { colors } from "src/constants/colorPalette";

import FormInput from "src/components/FormInput";
import RemoveInput from "src/components/RemoveInput";

interface QuizAnswersProps {
  answers: CourseQuizAnswer[],
  canRemoveQuizAnswer: boolean,
  onClickAddNewQuizAnswer: () => void,
  onClickRemoveQuizAnswer: (answerId: string) => void,
  onClickToggleCorrectQuizAnswer: (answerId: string, isCorrectAnswer: boolean) => void,
  onChangeQuizAnswer: (inputValue: string, answerId: string) => void,
}

const QuizAnswers: React.FC<QuizAnswersProps> = ({
  answers,
  canRemoveQuizAnswer,
  onChangeQuizAnswer,
  onClickAddNewQuizAnswer,
  onClickRemoveQuizAnswer,
  onClickToggleCorrectQuizAnswer,
}) => {
  const lastAnswerInput = answers.length - 1;

  return (
    <div>
      <FormLabel className="m-0">Answers (tick correct ones)</FormLabel>
      {answers.map(({ answer, id: answerId, isCorrectAnswer }, index: number) => {
        return (
          <div
            className="d-flex flex-column"
            key={`quiz-answer-${answerId}`}>
            <div className="quiz-checkbox">
              <FormCheck
                className="me-3"
                type="checkbox"
                id={`quiz-checkbox-${answerId}`}
                onClick={() => onClickToggleCorrectQuizAnswer(answerId, isCorrectAnswer)}/>
              <FormInput
                formId={`quiz-answer-${answerId}`}
                type="text"
                key={`quiz-answer-${answerId}`}
                value={answer}
                onChange={(e) => onChangeQuizAnswer(e.target.value, answerId)}
                formGroupClassname="my-4 section-input"/>
              {canRemoveQuizAnswer
                ? (
                  <RemoveInput
                    onClickFunction={() => onClickRemoveQuizAnswer(answerId)}
                    margin="ms-2 mb-3"
                    padding="pt-3 px-2" />
                )
                : null
              }
            </div>
            <div className="quiz-plus-icon">
              {index === lastAnswerInput
                ? (
                  <PlusIcon
                    stroke={colors.green}
                    className="mb-4"
                    onClick={onClickAddNewQuizAnswer} />
                )
                : null
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizAnswers;
import { colors } from "src/constants/colorPalette";
import { CourseQuizSection, CourseSection } from "src/types";
import { ReactComponent as ChevronLeft } from "src/icons/chevronLeft.svg";

import Header from "./Header";

interface QuizProps {
  quizSection: CourseQuizSection,
  currentSectionIndex: number,
}

const Quiz : React.FC<QuizProps> = ({ quizSection, currentSectionIndex }) => {
  return (
    <div className="mb-4 ms-4">
      <div>
        <div className="d-flex align-items-center">
          <div role="button">
            <ChevronLeft
              stroke={colors.orange}
              className="mt-4 me-1"/>
          </div>
          <Header title="Quiz" />
        </div>
        {quizSection.questions.map(({ question }) => {
          return (
            <h5 className="mt-2 mb-4">{question}</h5>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;


import { colors } from "src/constants/colorPalette";
import { CourseSection } from "src/types";
import { ReactComponent as ChevronLeft } from "src/icons/chevronLeft.svg";

import Header from "./Header";

interface QuizProps {
  currentSectionIndex: number,
  sections: CourseSection[],
}

const Quiz : React.FC<QuizProps> = ({ currentSectionIndex, sections }) => {
  return (
    <div className="mb-4 ms-4">
      <div>
        <div className="d-flex align-items-center">
          <div role="button">
            <ChevronLeft
              stroke={colors.orange}
              className="mt-4 me-1"/>
          </div>
          <Header title="Multiple Choice Quiz" />
        </div>
        {sections[currentSectionIndex].questions.map((currentSection) => {
          return (
            <h5 className="mt-2 mb-4">{`${currentSectionIndex + 1}. ${currentSection.question}`}</h5>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;


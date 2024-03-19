import { CourseQuizSection } from "src/types";

import Quiz from "./Quiz";

interface CourseQuizContainerProps {
  currentSectionIndex: number,
  quizSection: CourseQuizSection,
}

const CourseQuizContainer : React.FC<CourseQuizContainerProps> = ({ quizSection, currentSectionIndex }) => {
  return (
    <Quiz
      quizSection={quizSection}
      currentSectionIndex={currentSectionIndex} />
  );
};

export default CourseQuizContainer;
import { CourseSection } from "src/types";

import Quiz from "./Quiz";

interface CourseQuizContainerProps {
  currentSectionIndex: number,
  sections: CourseSection[],
}

const CourseQuizContainer : React.FC<CourseQuizContainerProps> = ({ currentSectionIndex, sections }) => {
  console.log(">>> sections: ", sections);

  return (
    <Quiz
      currentSectionIndex={currentSectionIndex}
      sections={sections} />
  );
};

export default CourseQuizContainer;
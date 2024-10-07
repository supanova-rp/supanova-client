import { Course, SectionProgressState } from "src/types";
import { getIsVideoSection } from "src/utils/course-utils";

import SectionTableRow from "./SectionTableRow";

interface Props {
  course: Course;
  currentSectionProgressIndex: number;
  onSelectVideo: (sectionIndex: number) => void;
  onSelectQuiz: (sectionIndex: number) => void;
}

export const CourseSummary: React.FC<Props> = ({
  course,
  currentSectionProgressIndex,
  onSelectVideo,
  onSelectQuiz,
}) => {
  const getSectionProgressState = (
    sectionIndex: number,
  ): SectionProgressState => {
    if (sectionIndex === currentSectionProgressIndex) {
      return SectionProgressState.Current;
    }

    if (sectionIndex > currentSectionProgressIndex) {
      return SectionProgressState.Locked;
    }

    return SectionProgressState.Completed;
  };

  return (
    <div
      key={`${course.title} ${course.id}`}
      className="course-summary-container"
    >
      <p className="course-desc">{course.description}</p>
      <table className="table table-bordered mt-3">
        <tbody>
          {course.sections.map((section, sectionIndex) => {
            const isVideoSection = getIsVideoSection(section);

            return (
              <SectionTableRow
                key={section.id}
                isVideoSection={isVideoSection}
                sectionProgressState={getSectionProgressState(sectionIndex)}
                title={isVideoSection ? section.title : "Quiz"}
                onClickFunc={
                  isVideoSection
                    ? () => onSelectVideo(sectionIndex)
                    : () => onSelectQuiz(sectionIndex)
                }
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

import { getIsVideoSection } from "src/utils/course-utils";

import SectionTableRow from "./SectionTableRow";
import { Course } from "../../types/index";

interface Props {
  course: Course;
  onSelectVideo: (sectionIndex: number) => void;
  onSelectQuiz: (sectionIndex: number) => void;
}

export const CourseSummary: React.FC<Props> = ({
  course,
  onSelectVideo,
  onSelectQuiz,
}) => {
  return (
    <div
      key={`${course.title} ${course.id}`}
      className="course-summary-container"
    >
      <p className="course-desc">{course.description}</p>
      <table className="table table-bordered mt-3">
        <tbody>
          {course.sections.map((section, sectionIndex) => {
            const isCompletedInLocalStorage = JSON.parse(
              localStorage.getItem(`section-progress-${section.id}`) || "{}",
            ).completed;
            const isVideoSection = getIsVideoSection(section);

            return (
              <SectionTableRow
                key={section.id}
                completed={section.completed || isCompletedInLocalStorage}
                isVideoSection={isVideoSection}
                sectionId={section.id}
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

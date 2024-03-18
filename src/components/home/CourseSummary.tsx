import { getIsVideoSection } from "src/utils/course-utils";
import { Course, SectionTypes } from "../../types/index";

import SectionTableRow from "./SectionTableRow";

interface Props {
  course: Course,
  onSelectVideo: (sectionIndex: number) => void,
  onSelectQuiz: (sectionIndex: number) => void,
}

export const CourseSummary: React.FC<Props> = ({ course, onSelectVideo, onSelectQuiz }) => {
  return (
    <div
      key={`${course.title} ${course.id}`}
      className="mb-5">
      <h5>{course.title}</h5>
      <p className="mt-3 mb-4">{course.description}</p>
      <table className="table table-bordered mt-3">
        <tbody>
          {course.sections.map((section, sectionIndex) => {
            const isCompletedInLocalStorage = JSON.parse(localStorage.getItem(`section-progress-${section.id}`) || "{}").completed;
            const isVideoSection = getIsVideoSection(section);

            return (
              <SectionTableRow
                key={section.id}
                completed={section.completed || isCompletedInLocalStorage}
                isVideoSection={isVideoSection}
                sectionId={section.id}
                title={isVideoSection ? section.title : "Quiz"}
                onClickFunc={isVideoSection ? () => onSelectVideo(sectionIndex) : () => onSelectQuiz(sectionIndex)} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

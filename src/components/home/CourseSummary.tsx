import { Button } from "react-bootstrap";
import { useAuth } from "src/contexts/AuthContext";
import { Course, SectionProgressState } from "src/types";
import { getIsVideoSection } from "src/utils/course-utils";

import useUpdateProgress from "./hooks/useUpdateProgress";
import SectionTableRow from "./SectionTableRow";

interface Props {
  course: Course;
  currentSectionProgressIndex: number;
  refetchProgress: (shouldLoad?: boolean) => void;
  onSelectVideo: (sectionIndex: number) => void;
  onSelectQuiz: (sectionIndex: number) => void;
}

export const CourseSummary: React.FC<Props> = ({
  course,
  currentSectionProgressIndex,
  refetchProgress,
  onSelectVideo,
  onSelectQuiz,
}) => {
  const { isAdmin } = useAuth();

  const { requestUpdateProgress } = useUpdateProgress(
    course.id,
    refetchProgress,
  );

  // Only for admin users for testing
  const resetProgress = () => {
    requestUpdateProgress(0);
  };

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

      {isAdmin ? (
        <Button type="button" onClick={resetProgress} className="mb-4">
          Reset course progress (admin only power)
        </Button>
      ) : null}
    </div>
  );
};

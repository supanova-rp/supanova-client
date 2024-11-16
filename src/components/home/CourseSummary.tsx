import { Button } from "react-bootstrap";
import { useAuth } from "src/contexts/AuthContext";
import useRequest from "src/hooks/useRequest";
import {
  Course,
  ID,
  SectionProgressState,
  UserCourseProgress,
} from "src/types";
import { getIsVideoSection } from "src/utils/course-utils";

import SectionTableRow from "./SectionTableRow";

interface Props {
  course: Course;
  completedSectionIds: UserCourseProgress["completedSectionIds"];
  refetchProgress: (shouldLoad?: boolean) => void;
  onSelectVideo: (sectionIndex: number) => void;
  onSelectQuiz: (sectionIndex: number) => void;
}

export const CourseSummary: React.FC<Props> = ({
  course,
  completedSectionIds,
  refetchProgress,
  onSelectVideo,
  onSelectQuiz,
}) => {
  const { isAdmin } = useAuth();
  const resetProgress = useRequest("/reset-progress");

  const getCurrentSectionProgressIndex = () => {
    if (completedSectionIds.length === 0) {
      return 0;
    }

    // Find the completed section id with the highest index
    const highestCompletedIndex = completedSectionIds.reduce(
      (acc, sectionId) => {
        const sectionIndex = course.sections.findIndex(
          ({ id }) => id === sectionId,
        );

        if (sectionIndex > acc) {
          return sectionIndex;
        }

        return acc;
      },
      0,
    );

    // Then add 1 to it to get the one the user is currently on
    return highestCompletedIndex + 1;
  };

  const currentSectionProgressIndex = getCurrentSectionProgressIndex();

  // Only for admin users for testing
  const onResetProgress = () => {
    resetProgress({
      requestBody: {
        courseId: course.id,
      },
      onSuccess: refetchProgress,
      onError: () => {},
    });
  };

  const getSectionProgressState = (
    sectionId: ID,
    sectionIndex: number,
  ): SectionProgressState => {
    if (completedSectionIds.includes(sectionId)) {
      return SectionProgressState.Completed;
    }

    if (sectionIndex > currentSectionProgressIndex) {
      return SectionProgressState.Locked;
    }

    if (sectionIndex === currentSectionProgressIndex) {
      return SectionProgressState.Current;
    }

    return SectionProgressState.Empty;
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
                sectionProgressState={getSectionProgressState(
                  section.id,
                  sectionIndex,
                )}
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
        <Button type="button" onClick={onResetProgress} className="mb-4">
          Reset course progress (admin only power)
        </Button>
      ) : null}
    </div>
  );
};

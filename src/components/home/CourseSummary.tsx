import { Button } from "react-bootstrap";
import { useAuth } from "src/contexts/AuthContext";
import { useLazyQuery } from "src/hooks/useLazyQuery";
import useRequest from "src/hooks/useRequest";
import {
  Course,
  ID,
  SectionProgressState,
  UserCourseProgress,
} from "src/types";
import {
  getIsQuizSection,
  getIsVideoSection,
  resetVideoProgressTime,
} from "src/utils/course-utils";

import SectionTableRow, { SectionTableRowTypes } from "./SectionTableRow";

interface Props {
  course: Course;
  completedIntro: boolean;
  completedSectionIds: UserCourseProgress["completedSectionIds"];
  refetchProgress: (shouldLoad?: boolean) => void;
  onSelectIntroduction: () => void;
  onSelectVideo: (sectionIndex: number) => void;
  onSelectQuiz: (sectionIndex: number) => void;
}

export const CourseSummary: React.FC<Props> = ({
  course,
  completedIntro,
  completedSectionIds,
  refetchProgress,
  onSelectIntroduction,
  onSelectVideo,
  onSelectQuiz,
}) => {
  const { isAdmin } = useAuth();
  const resetProgress = useRequest("/reset-progress");
  const { request: resetQuizState } = useLazyQuery<null>("/reset-quiz-state");

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

  const resetVideoSectionProgress = () => {
    course.sections.forEach(section => {
      if (getIsVideoSection(section)) {
        resetVideoProgressTime(section.id);
      }
    });
  };

  const resetQuizSectionProgress = () => {
    course.sections.forEach(section => {
      if (getIsQuizSection(section)) {
        resetQuizState({
          quizId: section.id,
        });
      }
    });
  };

  // Only for admin users for testing
  const onResetProgress = () => {
    resetProgress({
      requestBody: {
        courseId: course.id,
      },
      onSuccess: () => {
        refetchProgress();
        resetVideoSectionProgress();
        resetQuizSectionProgress();
      },
      onError: () => {},
    });
  };

  const getSectionProgressState = (
    sectionId: ID,
    sectionIndex: number,
  ): SectionProgressState => {
    if (!completedIntro) {
      return SectionProgressState.Locked;
    }

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

  const getIntroProgressState = (): SectionProgressState => {
    if (completedIntro) {
      return SectionProgressState.Completed;
    }

    return SectionProgressState.Current;
  };

  return (
    <div
      key={`${course.title} ${course.id}`}
      className="course-summary-container"
    >
      <p className="course-desc">{course.description}</p>
      <table className="table table-bordered mt-3">
        <tbody>
          <SectionTableRow
            rowType={SectionTableRowTypes.Introduction}
            sectionProgressState={getIntroProgressState()}
            title="Introduction"
            onClickFunc={onSelectIntroduction}
          />

          {course.sections.map((section, sectionIndex) => {
            const isVideoSection = getIsVideoSection(section);

            return (
              <SectionTableRow
                key={section.id}
                rowType={
                  isVideoSection
                    ? SectionTableRowTypes.Video
                    : SectionTableRowTypes.Quiz
                }
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

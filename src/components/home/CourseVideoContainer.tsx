import { SyntheticEvent } from "react";
import { feedbackMessages } from "src/constants/constants";
import { getVideoProgressKey } from "src/utils/course-utils";

import CourseSectionContainer from "./CourseSectionContainer";
import useUpdateProgress from "./hooks/useUpdateProgress";
import Video from "./Video";
import { ChangeDirection, CourseVideoSection } from "../../types/index";

interface CourseProps {
  courseId: number;
  courseTitle: string;
  videoSection: CourseVideoSection;
  initialCurrentVideoTime: number;
  canGoBack: boolean;
  isLastSection: boolean;
  isCurrentSectionCompleted: boolean;
  refetchProgress: (shouldLoad: boolean) => void;
  onChangeSection: (direction: ChangeDirection) => void;
  onCourseComplete: () => void;
  onClickBackChevron: () => void;
}

const CourseVideoContainer: React.FC<CourseProps> = ({
  courseId,
  courseTitle,
  videoSection,
  initialCurrentVideoTime,
  canGoBack,
  isLastSection,
  isCurrentSectionCompleted,
  refetchProgress,
  onChangeSection,
  onCourseComplete,
  onClickBackChevron,
}) => {
  const { id: sectionId, videoUrl, title } = videoSection;

  const handleSectionComplete = () => {
    if (isLastSection) {
      onCourseComplete();
    } else {
      onChangeSection("next");
    }
  };

  const onUpdateProgressSuccess = () => {
    refetchProgress(false);
    handleSectionComplete();
  };

  const { loading, error, requestUpdateProgress } = useUpdateProgress(
    courseId,
    onUpdateProgressSuccess,
  );

  const onClickContinue = () => {
    if (isCurrentSectionCompleted) {
      handleSectionComplete(); // no need to update progress
    } else {
      requestUpdateProgress(sectionId);
    }
  };

  const onVideoEnded = () => {
    localStorage.setItem(
      getVideoProgressKey(courseId, sectionId),
      JSON.stringify({ currentTime: 0 }),
    );
  };

  const onVideoTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const videoElement = e.target as HTMLVideoElement;
    const { currentTime } = videoElement;

    const localStorageValue = JSON.parse(
      localStorage.getItem(`section-progress-${sectionId}`) || "{}",
    );

    const sectionProgressInfo = {
      ...localStorageValue,
      currentTime,
    };

    localStorage.setItem(
      `section-progress-${sectionId}`,
      JSON.stringify(sectionProgressInfo),
    );
  };

  return (
    <CourseSectionContainer
      canGoBack={canGoBack}
      courseTitle={courseTitle}
      loading={loading}
      error={error ? feedbackMessages.genericErrorTryAgain : undefined}
      continueText={isLastSection ? "Finish" : "Continue"}
      onChangeSection={onChangeSection}
      onClickContinue={onClickContinue}
      onClickBackChevron={onClickBackChevron}
    >
      <Video
        title={title}
        videoUrl={videoUrl}
        initialCurrentVideoTime={initialCurrentVideoTime}
        onVideoEnded={onVideoEnded}
        onVideoTimeUpdate={onVideoTimeUpdate}
      />
    </CourseSectionContainer>
  );
};

export default CourseVideoContainer;

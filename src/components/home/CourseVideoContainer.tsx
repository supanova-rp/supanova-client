import { SyntheticEvent, useState } from "react";
import { feedbackMessages } from "src/constants/constants";
import useRequest from "src/hooks/useRequest";
import { getVideoProgressKey } from "src/utils/course-utils";

import CourseSectionContainer from "./CourseSectionContainer";
import Video from "./Video";
import { ChangeDirection, CourseVideoSection } from "../../types/index";

interface CourseProps {
  courseId: number;
  courseTitle: string;
  videoSection: CourseVideoSection;
  initialCurrentVideoTime: number;
  canGoBack: boolean;
  isLastSection: boolean;
  currentSectionIndex: number | null;
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
  currentSectionIndex,
  onChangeSection,
  onCourseComplete,
  onClickBackChevron,
}) => {
  const { id: sectionId, videoUrl, title } = videoSection;
  const updateProgress = useRequest("/update-progress");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  const onUpdateProgressSuccess = () => {
    setLoading(false);

    if (isLastSection) {
      onCourseComplete();
    } else {
      onChangeSection("next");
    }
  };

  const requestUpdateProgress = () => {
    setLoading(true);
    setError(false);

    updateProgress({
      requestBody: {
        courseId,
        currentSectionIndex,
      },
      onSuccess: onUpdateProgressSuccess,
      onError: () => {
        setLoading(false);
        setError(true);
      },
    });
  };

  return (
    <CourseSectionContainer
      canGoBack={canGoBack}
      courseTitle={courseTitle}
      loading={loading}
      error={error ? feedbackMessages.genericErrorTryAgain : undefined}
      continueText={isLastSection ? "Finish" : "Continue"}
      onChangeSection={onChangeSection}
      onClickContinue={requestUpdateProgress}
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

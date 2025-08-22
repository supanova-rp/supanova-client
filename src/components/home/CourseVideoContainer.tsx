import { SyntheticEvent } from "react";
import { feedbackMessages } from "src/constants/constants";
import { setVideoProgressTime } from "src/utils/course-utils";

import { CourseMaterials } from "./CourseMaterials";
import CourseSectionContainer from "./CourseSectionContainer";
import useUpdateProgress from "./hooks/useUpdateProgress";
import Video from "./Video";
import {
  ChangeDirection,
  CourseMaterialViewModel,
  CourseVideoSection,
  ID,
} from "../../types/index";

interface CourseProps {
  courseId: ID;
  courseTitle: string;
  videoSection: CourseVideoSection;
  courseMaterials: CourseMaterialViewModel[];
  initialCurrentVideoTime: number;
  canGoBack: boolean;
  isLastSection: boolean;
  isCurrentSectionCompleted: boolean;
  courseCompleteLoading: boolean;
  refetchProgress: (shouldLoad: boolean) => void;
  onChangeSection: (direction: ChangeDirection) => void;
  onCourseComplete: () => void;
  onClickBackChevron: () => void;
}

const CourseVideoContainer: React.FC<CourseProps> = ({
  courseId,
  courseTitle,
  videoSection,
  courseMaterials,
  initialCurrentVideoTime,
  canGoBack,
  isLastSection,
  isCurrentSectionCompleted,
  courseCompleteLoading,
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
    setVideoProgressTime(sectionId, 0);
  };

  const onVideoTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const videoElement = e.target as HTMLVideoElement;
    const { currentTime } = videoElement;

    setVideoProgressTime(sectionId, currentTime);
  };

  return (
    <>
      <CourseSectionContainer
        canGoBack={canGoBack}
        courseTitle={courseTitle}
        loading={loading || courseCompleteLoading}
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

      <div style={{ marginTop: 24 }}>
        <CourseMaterials materials={courseMaterials} headerType="small" />
      </div>
    </>
  );
};

export default CourseVideoContainer;

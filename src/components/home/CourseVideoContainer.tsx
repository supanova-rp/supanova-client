import { SyntheticEvent } from "react";
import { feedbackMessages } from "src/constants/constants";
import { useQuery } from "src/hooks/useQuery";
import {
  ChangeDirection,
  CourseMaterialViewModel,
  CourseVideoSection,
  ID,
} from "src/types/index";
import { CourseVideoServerModel } from "src/types/server";
import { setVideoProgressTime } from "src/utils/course-utils";

import { CourseMaterials } from "./CourseMaterials";
import CourseSectionContainer from "./CourseSectionContainer";
import useUpdateProgress from "./hooks/useUpdateProgress";
import Video from "./Video";
import VideoLoader from "./VideoLoader";
import ErrorCard from "../ErrorCard";

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
  const { id: sectionId, storageKey, title } = videoSection;

  const {
    data: videoData,
    loading: loadingUrl,
    error: urlError,
    refetch: refetchUrl,
  } = useQuery<CourseVideoServerModel>("/video-url", {
    requestBody: {
      courseId,
      storageKey,
    },
    defaultError: feedbackMessages.getVideoError,
  });

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

  const renderVideo = () => {
    if (loadingUrl) {
      return <VideoLoader title={title} />;
    }

    if (urlError || !videoData?.url) {
      return (
        <div className="video-error-container">
          <ErrorCard
            errorMessage={urlError || ""}
            size="full"
            onClick={refetchUrl}
          />
        </div>
      );
    }

    return (
      <Video
        title={title}
        videoUrl={videoData.url}
        initialCurrentVideoTime={initialCurrentVideoTime}
        onVideoEnded={onVideoEnded}
        onVideoTimeUpdate={onVideoTimeUpdate}
      />
    );
  };

  return (
    <CourseSectionContainer
      canGoBack={canGoBack}
      courseTitle={courseTitle}
      loading={loading || courseCompleteLoading}
      error={error ? feedbackMessages.genericErrorTryAgain : undefined}
      continueText={isLastSection ? "Finish" : "Continue"}
      onChangeSection={onChangeSection}
      onClickContinue={onClickContinue}
      onClickBackChevron={onClickBackChevron}
      footer={
        <div style={{ marginTop: 24 }}>
          <CourseMaterials materials={courseMaterials} headerType="small" />
        </div>
      }
    >
      {renderVideo()}
    </CourseSectionContainer>
  );
};

export default CourseVideoContainer;

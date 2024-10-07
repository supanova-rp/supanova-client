import { SyntheticEvent } from "react";
import { getVideoProgressKey } from "src/utils/course-utils";

import Video from "./Video";
import { CourseVideoSection } from "../../types/index";

interface CourseProps {
  courseId: number;
  videoSection: CourseVideoSection;
  initialCurrentVideoTime: number;
}

const CourseVideoContainer: React.FC<CourseProps> = ({
  courseId,
  videoSection,
  initialCurrentVideoTime,
}) => {
  const { id: sectionId, videoUrl, title } = videoSection;

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
    <Video
      title={title}
      videoUrl={videoUrl}
      initialCurrentVideoTime={initialCurrentVideoTime}
      onVideoEnded={onVideoEnded}
      onVideoTimeUpdate={onVideoTimeUpdate}
    />
  );
};

export default CourseVideoContainer;

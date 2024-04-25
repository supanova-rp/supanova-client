import { SyntheticEvent } from "react";

import { CourseVideoSection } from "../../types/index";
import Video from "./Video";
import { getVideoProgressKey } from "src/utils/course-utils";

interface CourseProps {
  courseId: number,
  videoSection: CourseVideoSection,
  initialCurrentVideoTime: number,
}

const CourseVideoContainer: React.FC<CourseProps> = ({
  courseId,
  videoSection,
  initialCurrentVideoTime,
}) => {
  const { id: sectionId, videoUrl, title } = videoSection;

  const onVideoEnded = () => {
    const sectionProgressInfo = {
      completed: true,
      currentTime: 0,
    };

    // TODO:
    // implement course progress saving on server
    // in this func will want to say they have just completed this section
    localStorage.setItem(getVideoProgressKey(courseId, sectionId), JSON.stringify(sectionProgressInfo));
  };

  const onVideoTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const videoElement = e.target as HTMLVideoElement;
    const { currentTime } = videoElement;

    const localStorageValue = JSON.parse(localStorage.getItem(`section-progress-${sectionId}`) || "{}");

    const sectionProgressInfo = {
      ...localStorageValue,
      currentTime,
    };

    localStorage.setItem(`section-progress-${sectionId}`, JSON.stringify(sectionProgressInfo));
  };

  return (
    <Video
      title={title}
      videoUrl={videoUrl}
      initialCurrentVideoTime={initialCurrentVideoTime}
      onVideoEnded={onVideoEnded}
      onVideoTimeUpdate={onVideoTimeUpdate} />
  );
};

export default CourseVideoContainer;

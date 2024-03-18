import { Dispatch, SetStateAction, SyntheticEvent } from "react";

import { ChangeDirection, CourseVideoSection } from "../../types/index";
import Video from "./Video";
import { getVideoProgressKey } from "src/utils/course-utils";

interface CourseProps {
  courseId: number,
  videoSection: CourseVideoSection,
  initialCurrentVideoTime: number,
  courseTitle: string,
  hasNext: boolean,
  hasPrevious: boolean,
  setCurrentSectionIndex: (sectionIndex: number | null) => void,
  setInitialCurrentVideoTime: Dispatch<SetStateAction<number>>,
  onChangeSection: (d: ChangeDirection) => void,
}

const CourseVideoContainer: React.FC<CourseProps> = ({
  courseId,
  videoSection,
  initialCurrentVideoTime,
  courseTitle,
  hasNext,
  hasPrevious,
  setCurrentSectionIndex,
  setInitialCurrentVideoTime,
  onChangeSection,
}) => {
  const hasPrevAndNext = hasNext && hasPrevious;

  const { id: sectionId, videoUrl, title } = videoSection;

  const onExitVideo = () => {
    setInitialCurrentVideoTime(0);
    setCurrentSectionIndex(null);
  };

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
      courseTitle={courseTitle}
      initialCurrentVideoTime={initialCurrentVideoTime}
      hasNext={hasNext}
      hasPrevAndNext={hasPrevAndNext}
      onExitVideo={onExitVideo}
      onChangeVideo={onChangeSection}
      onVideoEnded={onVideoEnded}
      onVideoTimeUpdate={onVideoTimeUpdate} />
  );
};

export default CourseVideoContainer;

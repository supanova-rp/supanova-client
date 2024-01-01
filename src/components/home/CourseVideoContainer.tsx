import { Dispatch, SetStateAction, SyntheticEvent } from "react";

import { CourseSection, VideoChangeDirection } from "../../types/index";
import Video from "./Video";
import { isVideoSection } from "../admin/course-form/utils";

interface CourseProps {
  currentSectionIndex: number,
  currentSectionId: number,
  initialCurrentVideoTime: number,
  courseTitle: string,
  sections: CourseSection[],
  updateCourses: (updatedSections: CourseSection[]) => void;
  setCurrentCourseIndex: (courseIndex: number) => void,
  setCurrentSectionIndex: (sectionIndex: number) => void,
  setIsVideoShowing: (value: boolean) => void,
  setInitialCurrentVideoTime: Dispatch<SetStateAction<number>>,
}

const CourseVideoContainer: React.FC<CourseProps> = ({
  currentSectionIndex,
  currentSectionId,
  initialCurrentVideoTime,
  courseTitle,
  sections,
  updateCourses,
  setCurrentCourseIndex,
  setCurrentSectionIndex,
  setIsVideoShowing,
  setInitialCurrentVideoTime,
}) => {
  const hasNext = currentSectionIndex + 1 !== sections.length;
  const hasPrev = currentSectionIndex !== 0;
  const hasPrevAndNext = hasNext && hasPrev;

  const updateInitialCurrentVideoTime = (sectionId: number) => {
    if (localStorage.getItem(`section-progress-${sectionId}`)) {
      const localStorageCurrentVideoTimeValue = JSON.parse(localStorage.getItem(`section-progress-${sectionId}`) || "{}").currentTime;

      setInitialCurrentVideoTime(localStorageCurrentVideoTimeValue);
    } else {
      setInitialCurrentVideoTime(0);
    }
  };

  const onChangeVideo = (direction: VideoChangeDirection) => {
    const newSectionIndex = direction === "next" ? currentSectionIndex + 1 : currentSectionIndex - 1;
    const newSectionId = sections[newSectionIndex].id;

    setCurrentSectionIndex(newSectionIndex);
    updateInitialCurrentVideoTime(newSectionId);
  };

  const onExitVideo = () => {
    setInitialCurrentVideoTime(0);
    setIsVideoShowing(false);
    setCurrentCourseIndex(0);
    setCurrentSectionIndex(0);
  };

  const handleOnVideoEnded = () => {
    const sectionProgressInfo = {
      completed: true,
      currentTime: 0,
    };

    localStorage.setItem(`section-progress-${currentSectionId}`, JSON.stringify(sectionProgressInfo));

    const updatedSectionsWithVideoCompletedFlag = sections.map((section, index) => {
      if (index === currentSectionIndex && isVideoSection(section)) {
        return {
          ...section,
          completed: true,
        };
      }

      return section;
    });

    updateCourses(updatedSectionsWithVideoCompletedFlag);
  };

  const onTimeUpdateSaveToLocalStorage = (e: SyntheticEvent<HTMLVideoElement>) => {
    const videoElement = e.target as HTMLVideoElement;
    const { currentTime } = videoElement;

    const localStorageValue = JSON.parse(localStorage.getItem(`section-progress-${currentSectionId}`) || "{}");

    const sectionProgressInfo = {
      ...localStorageValue,
      currentTime,
    };

    localStorage.setItem(`section-progress-${currentSectionId}`, JSON.stringify(sectionProgressInfo));
  };

  return (
    <Video
      sections={sections}
      courseTitle={courseTitle}
      initialCurrentVideoTime={initialCurrentVideoTime}
      hasNext={hasNext}
      hasPrevAndNext={hasPrevAndNext}
      currentSectionIndex={currentSectionIndex}
      onExitVideo={onExitVideo}
      onChangeVideo={onChangeVideo}
      handleOnVideoEnded={handleOnVideoEnded}
      onTimeUpdateSaveToLocalStorage={onTimeUpdateSaveToLocalStorage} />
  );
};

export default CourseVideoContainer;

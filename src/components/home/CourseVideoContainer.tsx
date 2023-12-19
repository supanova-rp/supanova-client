import { Dispatch, SetStateAction, SyntheticEvent } from "react";

import { Course, VideoChangeDirection } from "../../types/index";
import Video from "./Video";

interface CourseProps {
  currentCourseIndex: number,
  currentSectionIndex: number,
  currentSectionId: number,
  initialCurrentVideoTime: number,
  courses: Course[],
  setCurrentCourseIndex: (courseIndex: number) => void,
  setCurrentSectionIndex: (sectionIndex: number) => void,
  setIsVideoShowing: (value: boolean) => void,
  setCourses: Dispatch<SetStateAction<Course[]>>,
  setInitialCurrentVideoTime: Dispatch<SetStateAction<number>>,
}

const CourseVideoContainer: React.FC<CourseProps> = ({
  currentCourseIndex,
  currentSectionIndex,
  currentSectionId,
  initialCurrentVideoTime,
  courses,
  setCurrentCourseIndex,
  setCurrentSectionIndex,
  setIsVideoShowing,
  setCourses,
  setInitialCurrentVideoTime,
}) => {
  const hasNext = currentSectionIndex + 1 !== courses[currentCourseIndex].sections.length;
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
    const newSectionId = courses[currentCourseIndex].sections[newSectionIndex].id;

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

    const updatedSectionsWithVideoCompletedFlag = courses[currentCourseIndex].sections.map((section, index) => {
      if (index === currentSectionIndex) {
        return {
          ...section,
          completed: true,
        };
      }

      return section;
    });

    const updatedCourses = courses.map((course, index) => {
      if (index === currentCourseIndex) {
        return {
          ...course,
          sections: updatedSectionsWithVideoCompletedFlag,
        };
      }

      return course;
    });

    setCourses(updatedCourses);
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
      courses={courses}
      initialCurrentVideoTime={initialCurrentVideoTime}
      hasNext={hasNext}
      hasPrevAndNext={hasPrevAndNext}
      currentCourseIndex={currentCourseIndex}
      currentSectionIndex={currentSectionIndex}
      onExitVideo={onExitVideo}
      onChangeVideo={onChangeVideo}
      handleOnVideoEnded={handleOnVideoEnded}
      onTimeUpdateSaveToLocalStorage={onTimeUpdateSaveToLocalStorage} />
  );
};

export default CourseVideoContainer;

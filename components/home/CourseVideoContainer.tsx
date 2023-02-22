import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import { Course } from '@/index';
import Video from './Video';

interface Props {
  currentCourseIndex: number,
  currentSectionIndex: number,
  currentSectionId: number,
  initialCurrentVideoTime: number,
  allCourses: Course[],
  logoutError: string,
  setCurrentCourseIndex: (parameter: number) => void,
  setCurrentSectionIndex: (parameter: number) => void,
  setIsVideoPlaying: (parameter: boolean) => void,
  setAllCourses: Dispatch<SetStateAction<Course[]>>,
  setInitialCurrentVideoTime: Dispatch<SetStateAction<number>>,
}

const CourseVideoContainer: React.FC<Props> = ({
  currentCourseIndex,
  currentSectionIndex,
  currentSectionId,
  initialCurrentVideoTime,
  allCourses,
  logoutError,
  setCurrentCourseIndex,
  setCurrentSectionIndex,
  setIsVideoPlaying,
  setAllCourses,
  setInitialCurrentVideoTime,
}) => {
  const hasNext = currentSectionIndex + 1 !== allCourses[currentCourseIndex].sections.length;
  const hasPrev = currentSectionIndex !== 0;
  const hasPrevAndNext = hasNext && hasPrev;

  const updateInitialCurrentVideoTime = (sectionId: number) => {
    if (localStorage.getItem(`section-progress-${sectionId}`)) {
      const localStorageCurrentVideoTimeValue = JSON.parse(localStorage.getItem(`section-progress-${sectionId}`) || '{}').currentTime;

      setInitialCurrentVideoTime(localStorageCurrentVideoTimeValue);
    } else {
      setInitialCurrentVideoTime(0);
    }
  };

  const onChangeVideo = (direction: string) => {
    const newSectionIndex = direction === 'next' ? currentSectionIndex + 1 : currentSectionIndex - 1;
    const newSectionId = allCourses[currentCourseIndex].sections[newSectionIndex].id;

    setCurrentSectionIndex(newSectionIndex);
    updateInitialCurrentVideoTime(newSectionId);
  };

  const onExitVideo = () => {
    setInitialCurrentVideoTime(0);
    setIsVideoPlaying(false);
    setCurrentCourseIndex(0);
    setCurrentSectionIndex(0);
  };

  const handleOnVideoEnded = () => {
    const sectionProgressInfo = {
      completed: true,
      currentTime: 0,
    };

    localStorage.setItem(`section-progress-${currentSectionId}`, JSON.stringify(sectionProgressInfo));

    const updatedSectionsWithVideoCompletedFlag = allCourses[currentCourseIndex].sections.map((section, index) => {
      if (index === currentSectionIndex) {
        return {
          ...section,
          completed: true,
        };
      }

      return section;
    });

    const updatedCourses = allCourses.map((course, index) => {
      if (index === currentCourseIndex) {
        return {
          ...course,
          sections: updatedSectionsWithVideoCompletedFlag,
        };
      }

      return course;
    });

    setAllCourses(updatedCourses);
  };

  const onTimeUpdateSaveToLocalStorage = (e: SyntheticEvent<HTMLVideoElement>) => {
    const videoElement = e.target as HTMLVideoElement;
    const { currentTime } = videoElement;

    const localStorageValue = JSON.parse(localStorage.getItem(`section-progress-${currentSectionId}`) || '{}');

    const sectionProgressInfo = {
      ...localStorageValue,
      currentTime,
    };

    localStorage.setItem(`section-progress-${currentSectionId}`, JSON.stringify(sectionProgressInfo));
  };

  return (
  // TODO: change this
    <div style={{ width: '1000px' }}>
      <Video
        logoutError={logoutError}
        allCourses={allCourses}
        initialCurrentVideoTime={initialCurrentVideoTime}
        hasNext={hasNext}
        hasPrevAndNext={hasPrevAndNext}
        currentCourseIndex={currentCourseIndex}
        currentSectionIndex={currentSectionIndex}
        onExitVideo={onExitVideo}
        onChangeVideo={onChangeVideo}
        handleOnVideoEnded={handleOnVideoEnded}
        onTimeUpdateSaveToLocalStorage={onTimeUpdateSaveToLocalStorage} />
    </div>
  );
};

export default CourseVideoContainer;

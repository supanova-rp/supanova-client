import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import { Course, CourseSection } from '@/index';
import Video from './Video';

interface Props {
  currentCourseIndex: number,
  currentSectionIndex: number,
  currentSectionId: number,
  currentSection: CourseSection,
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
  currentSection,
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

  const onVideoEndedMarkSectionAsComplete = () => {
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
    const sectionProgressInfo = {
      completed: currentSection.completed,
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
        hasPrev={hasPrev}
        currentCourseIndex={currentCourseIndex}
        currentSectionIndex={currentSectionIndex}
        onExitVideo={onExitVideo}
        onChangeVideo={onChangeVideo}
        onVideoEndedMarkSectionAsComplete={onVideoEndedMarkSectionAsComplete}
        onTimeUpdateSaveToLocalStorage={onTimeUpdateSaveToLocalStorage} />
    </div>
  );
};

export default CourseVideoContainer;

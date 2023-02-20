import { Dispatch, SetStateAction } from 'react';

import { Course } from '@/index';
import Video from './Video';

interface Props {
  currentCourseIndex: number,
  currentSectionIndex: number,
  initialCurrentVideoTime: number,
  allCourses: Course[],
  logoutError: string,
  setCurrentCourseIndex: (parameter: number) => void,
  setCurrentSectionIndex: (parameter: number) => void,
  setIsVideoPlaying: (parameter: boolean) => void,
  setAllCourses: Dispatch<SetStateAction<Course[]>>
}

const CourseVideoContainer: React.FC<Props> = ({
  currentCourseIndex,
  currentSectionIndex,
  initialCurrentVideoTime,
  allCourses,
  logoutError,
  setCurrentCourseIndex,
  setCurrentSectionIndex,
  setIsVideoPlaying,
  setAllCourses,
}) => {
  const hasNext = currentSectionIndex + 1 !== allCourses[currentCourseIndex].sections.length;
  const hasPrev = currentSectionIndex !== 0;

  const onChangeVideo = (direction: string) => {
    if (direction === 'next') {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const onExitVideo = () => {
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

  const onTimeUpdateSaveToLocalStorage = (e) => {
    const currentSection = allCourses[currentCourseIndex].sections[currentSectionIndex];
    const currentSectionId = currentSection.id;

    const sectionProgressInfo = {
      completed: currentSection.completed,
      currentTime: e.target.currentTime,
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

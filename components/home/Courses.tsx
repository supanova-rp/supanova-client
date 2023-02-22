import { useState } from 'react';

import { Course, LogoutErrorProps } from '@/index';

import CoursesList from './CoursesList';
import CourseVideoContainer from './CourseVideoContainer';

interface Props extends LogoutErrorProps {
  courses: Course[],
}

const Courses: React.FC<Props> = ({ logoutError, courses }) => {
  const [allCourses, setAllCourses] = useState<Course[]>(courses);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState<number>(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [initialCurrentVideoTime, setInitialCurrentVideoTime] = useState<number>(0);

  const currentSection = allCourses[currentCourseIndex].sections[currentSectionIndex];
  const currentSectionId = currentSection.id;

  if (isVideoPlaying) {
    return (
      <CourseVideoContainer
        currentCourseIndex={currentCourseIndex}
        currentSectionIndex={currentSectionIndex}
        currentSectionId={currentSectionId}
        initialCurrentVideoTime={initialCurrentVideoTime}
        allCourses={allCourses}
        logoutError={logoutError}
        setCurrentCourseIndex={setCurrentCourseIndex}
        setCurrentSectionIndex={setCurrentSectionIndex}
        setIsVideoPlaying={setIsVideoPlaying}
        setAllCourses={setAllCourses}
        setInitialCurrentVideoTime={setInitialCurrentVideoTime} />
    );
  }

  const onSelectVideo = (courseIndex: number, sectionIndex: number) => {
    const sectionId = allCourses[courseIndex].sections[sectionIndex].id;

    if (localStorage.getItem(`section-progress-${sectionId}`)) {
      const localStorageCurrentVideoTimeValue = JSON.parse(localStorage.getItem(`section-progress-${sectionId}`) || '{}').currentTime;

      setInitialCurrentVideoTime(localStorageCurrentVideoTimeValue);
    } else {
      setInitialCurrentVideoTime(0);
    }

    setIsVideoPlaying(true);
    setCurrentCourseIndex(courseIndex);
    setCurrentSectionIndex(sectionIndex);
  };

  return (
    // TODO: change this
    <div style={{ width: '1000px' }}>
      <CoursesList
        logoutError={logoutError}
        allCourses={allCourses}
        onSelectVideo={onSelectVideo} />

    </div>
  );
};

export default Courses;

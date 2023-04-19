import { Dispatch, SetStateAction, useState } from "react";

import { Course, LogoutErrorProps } from "../../types/index";

import CoursesList from "./CoursesList";
import CourseVideoContainer from "./CourseVideoContainer";

interface Props extends LogoutErrorProps {
  courses: Course[],
  setCourses: Dispatch<SetStateAction<Course[]>>,
}

const Courses: React.FC<Props> = ({ logoutError, courses, setCourses }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState<number>(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [initialCurrentVideoTime, setInitialCurrentVideoTime] = useState<number>(0);

  const currentSection = courses[currentCourseIndex].sections[currentSectionIndex];
  const currentSectionId = currentSection.id;

  if (isVideoPlaying) {
    return (
      <CourseVideoContainer
        currentCourseIndex={currentCourseIndex}
        currentSectionIndex={currentSectionIndex}
        currentSectionId={currentSectionId}
        initialCurrentVideoTime={initialCurrentVideoTime}
        courses={courses}
        logoutError={logoutError}
        setCurrentCourseIndex={setCurrentCourseIndex}
        setCurrentSectionIndex={setCurrentSectionIndex}
        setIsVideoPlaying={setIsVideoPlaying}
        setCourses={setCourses}
        setInitialCurrentVideoTime={setInitialCurrentVideoTime} />
    );
  }

  const onSelectVideo = (courseIndex: number, sectionIndex: number) => {
    const sectionId = courses[courseIndex].sections[sectionIndex].id;

    if (localStorage.getItem(`section-progress-${sectionId}`)) {
      const localStorageCurrentVideoTimeValue = JSON.parse(localStorage.getItem(`section-progress-${sectionId}`) || "{}").currentTime;

      setInitialCurrentVideoTime(localStorageCurrentVideoTimeValue);
    } else {
      setInitialCurrentVideoTime(0);
    }

    setIsVideoPlaying(true);
    setCurrentCourseIndex(courseIndex);
    setCurrentSectionIndex(sectionIndex);
  };

  return (
    <div className="w-100">
      <CoursesList
        logoutError={logoutError}
        courses={courses}
        onSelectVideo={onSelectVideo} />
    </div>
  );
};

export default Courses;

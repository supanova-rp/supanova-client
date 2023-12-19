import { Dispatch, SetStateAction, useState } from "react";

import { Course } from "../../types/index";

import CoursesList from "./CoursesList";
import CourseVideoContainer from "./CourseVideoContainer";
import Header from "./Header";

interface CoursesProps {
  courses: Course[],
  setCourses: Dispatch<SetStateAction<Course[]>>,
}

const Courses: React.FC<CoursesProps> = ({ courses, setCourses }) => {
  const [isVideoShowing, setIsVideoShowing] = useState<boolean>(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState<number>(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [initialCurrentVideoTime, setInitialCurrentVideoTime] = useState<number>(0);

  const currentSection = courses[currentCourseIndex].sections[currentSectionIndex];
  const currentSectionId = currentSection.id;

  const onSelectVideo = (courseIndex: number, sectionIndex: number) => {
    const sectionId = courses[courseIndex].sections[sectionIndex].id;

    if (localStorage.getItem(`section-progress-${sectionId}`)) {
      const localStorageCurrentVideoTimeValue = JSON.parse(localStorage.getItem(`section-progress-${sectionId}`) || "{}").currentTime;

      setInitialCurrentVideoTime(localStorageCurrentVideoTimeValue);
    } else {
      setInitialCurrentVideoTime(0);
    }

    setIsVideoShowing(true);
    setCurrentCourseIndex(courseIndex);
    setCurrentSectionIndex(sectionIndex);
  };

  if (isVideoShowing) {
    return (
      <CourseVideoContainer
        currentCourseIndex={currentCourseIndex}
        currentSectionIndex={currentSectionIndex}
        currentSectionId={currentSectionId}
        initialCurrentVideoTime={initialCurrentVideoTime}
        courses={courses}
        setCurrentCourseIndex={setCurrentCourseIndex}
        setCurrentSectionIndex={setCurrentSectionIndex}
        setIsVideoShowing={setIsVideoShowing}
        setCourses={setCourses}
        setInitialCurrentVideoTime={setInitialCurrentVideoTime} />
    );
  }

  return (
    <div className="w-100">
      <Header title="Course Curriculum" />
      <CoursesList
        courses={courses}
        onSelectVideo={onSelectVideo} />
    </div>
  );
};

export default Courses;

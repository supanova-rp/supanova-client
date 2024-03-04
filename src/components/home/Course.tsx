import { Dispatch, SetStateAction, useState } from "react";

import { Course as CourseType, CourseSection } from "../../types/index";

import CoursesList from "./CoursesList";
import CourseVideoContainer from "./CourseVideoContainer";
import Header from "./Header";
import CourseQuizContainer from "./CourseQuizContainer";

interface CoursesProps {
  course: CourseType,
  setCourse: Dispatch<SetStateAction<CourseType>>,
}

const Course: React.FC<CoursesProps> = ({ course, setCourse }) => {
  const [isVideoShowing, setIsVideoShowing] = useState<boolean>(false);
  const [isQuizShowing, setIsQuizShowing] = useState<boolean>(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [initialCurrentVideoTime, setInitialCurrentVideoTime] = useState<number>(0);

  const currentSection = course.sections[currentSectionIndex];
  const currentSectionId = currentSection.id;

  const onSelectVideo = (courseIndex: number, sectionIndex: number) => {
    const sectionId = course.sections[sectionIndex].id;

    if (localStorage.getItem(`section-progress-${sectionId}`)) {
      const localStorageCurrentVideoTimeValue = JSON.parse(localStorage.getItem(`section-progress-${sectionId}`) || "{}").currentTime;

      setInitialCurrentVideoTime(localStorageCurrentVideoTimeValue);
    } else {
      setInitialCurrentVideoTime(0);
    }

    setIsVideoShowing(true);
    setCurrentSectionIndex(sectionIndex);
  };

  const onSelectQuiz = (courseIndex: number, sectionIndex: number) => {
    setIsQuizShowing(true);
    setCurrentSectionIndex(sectionIndex);
  };

  const updateCourses = (updatedSections: CourseSection[]) => {
    const updatedCourses = courses.map((course, index) => {
      if (index === currentCourseIndex) {
        return {
          ...course,
          sections: updatedSections,
        };
      }

      return course;
    });

    setCourse(updatedCourses);
  };

  if (isVideoShowing) {
    // TODO: update to only take the video section as a prop
    return (
      <CourseVideoContainer
        currentSectionIndex={currentSectionIndex}
        currentSectionId={currentSectionId}
        courseTitle={courses[currentCourseIndex].title}
        sections={courses[currentCourseIndex].sections}
        updateCourses={updateCourses}
        initialCurrentVideoTime={initialCurrentVideoTime}
        setCurrentCourseIndex={setCurrentCourseIndex}
        setCurrentSectionIndex={setCurrentSectionIndex}
        setIsVideoShowing={setIsVideoShowing}
        setInitialCurrentVideoTime={setInitialCurrentVideoTime} />
    );
  }

  if (isQuizShowing) {
    return (
      <CourseQuizContainer
        currentSectionIndex={currentSectionIndex}
        sections={courses[currentCourseIndex].sections} />
    );
  }

  console.log(">>> isQuizShowing: ", isQuizShowing);
  console.log(">>> currentSectionIndex: ", currentSectionIndex);
  console.log(">>> currentCourseIndex: ", currentCourseIndex);

  return (
    <div className="w-100">
      <Header title="Course Curriculum" />
      <CoursesList
        courses={courses}
        onSelectVideo={onSelectVideo}
        onSelectQuiz={onSelectQuiz} />
    </div>
  );
};

export default Course;

import { useState } from "react";

import { Course as CourseType, ChangeDirection } from "../../types/index";

import CourseVideoContainer from "./CourseVideoContainer";
import Header from "./Header";
import { CourseSummary } from "./CourseSummary";
import { getVideoProgressKey } from "src/utils/course-utils";
import { isQuizSection, isVideoSection } from "../admin/course-form/utils";
import CourseQuizContainer from "./CourseQuizContainer";

interface CoursesProps {
  course: CourseType,
}

const Course: React.FC<CoursesProps> = ({ course }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
  const [initialCurrentVideoTime, setInitialCurrentVideoTime] = useState<number>(0);

  const { sections, id: courseId } = course;

  const currentSection = typeof currentSectionIndex === "number" ? sections[currentSectionIndex] : null;

  console.log(">>>> currentSection: ", currentSection);

  const onSelectVideo = (sectionIndex: number) => {
    const sectionId = sections[sectionIndex].id;

    if (localStorage.getItem(`section-progress-${sectionId}`)) {
      const localStorageCurrentVideoTimeValue = JSON.parse(localStorage.getItem(`section-progress-${sectionId}`) || "{}").currentTime;

      setInitialCurrentVideoTime(localStorageCurrentVideoTimeValue);
    } else {
      setInitialCurrentVideoTime(0);
    }

    console.log(">>>> sectionIndex: ", sectionIndex);

    setCurrentSectionIndex(sectionIndex);
  };

  const onSelectQuiz = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
  };

  const updateInitialCurrentVideoTime = (sectionId: number) => {
    const key = getVideoProgressKey(courseId, sectionId);

    if (localStorage.getItem(key)) {
      const localStorageCurrentVideoTimeValue = JSON.parse(localStorage.getItem(key) || "{}").currentTime;

      setInitialCurrentVideoTime(localStorageCurrentVideoTimeValue);
    } else {
      setInitialCurrentVideoTime(0);
    }
  };

  const onChangeSection = (direction: ChangeDirection) => {
    const sectionIndex = currentSectionIndex || 0;
    const newSectionIndex = direction === "next" ? sectionIndex + 1 : sectionIndex - 1;
    const newSectionId = sections[newSectionIndex].id;

    setCurrentSectionIndex(newSectionIndex);
    updateInitialCurrentVideoTime(newSectionId);
  };

  if (typeof currentSectionIndex !== "number") {
    return (
      <div className="w-100">
        <Header title="Course Curriculum" />

        <CourseSummary
          course={course}
          onSelectVideo={onSelectVideo}
          onSelectQuiz={onSelectQuiz} />
      </div>
    );
  }

  if (currentSection && isVideoSection(currentSection)) {
    return (
      <CourseVideoContainer
        courseId={course.id}
        videoSection={currentSection}
        courseTitle={course.title}
        hasNext={currentSectionIndex + 1 !== sections.length}
        hasPrevious={currentSectionIndex !== 0}
        initialCurrentVideoTime={initialCurrentVideoTime}
        setCurrentSectionIndex={setCurrentSectionIndex}
        setInitialCurrentVideoTime={setInitialCurrentVideoTime}
        onChangeSection={onChangeSection} />
    );
  }

  if (currentSection && isQuizSection(currentSection)) {
    return (
      <CourseQuizContainer
        quizSection={currentSection}
        currentSectionIndex={currentSectionIndex} />
    );
  }

  return null;
};

export default Course;

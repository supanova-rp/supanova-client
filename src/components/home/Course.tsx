import { useState } from "react";

import { Course as CourseType, ChangeDirection } from "../../types/index";

import CourseVideoContainer from "./CourseVideoContainer";
import Header from "./Header";
import { CourseSummary } from "./CourseSummary";
import { getVideoProgressKey } from "src/utils/course-utils";
import { isQuizSection, isVideoSection } from "../admin/course-form/utils";
import CourseSectionContainer from "./CourseSectionContainer";
import { CourseQuizContainer } from "./CourseQuizContainer";
import { CourseComplete } from "./CourseComplete";

interface CoursesProps {
  course: CourseType,
}

const Course: React.FC<CoursesProps> = ({ course }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
  const [initialCurrentVideoTime, setInitialCurrentVideoTime] = useState<number>(0);
  const [isCourseComplete, setCourseComplete] = useState<boolean>(false);

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
    const newSection = sections[newSectionIndex];
    const { id: newSectionId } = newSection;

    setCurrentSectionIndex(newSectionIndex);

    if (isVideoSection(newSection)) {
      updateInitialCurrentVideoTime(newSectionId);
    }
  };

  const onClickBackChevron = () => {
    setInitialCurrentVideoTime(0);
    setCurrentSectionIndex(null);
  };

  const onCourseComplete = () => {
    setCourseComplete(true);
  };

  if (isCourseComplete) {
    // TODO: update pdfUrl with actual pdf
    return <CourseComplete pdfUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />;
  }

  if (typeof currentSectionIndex !== "number") {
    return (
      <div className="w-100">
        <Header
          className="default-header"
          title={course.title} />

        <CourseSummary
          course={course}
          onSelectVideo={onSelectVideo}
          onSelectQuiz={onSelectQuiz} />
      </div>
    );
  }

  const canGoBack = currentSectionIndex !== 0;
  const isLastSection = currentSectionIndex === sections.length - 1;

  if (currentSection && isVideoSection(currentSection)) {
    return (
      <CourseSectionContainer
        canGoBack={canGoBack}
        courseTitle={course.title}
        continueText={isLastSection ? "Finish" : "Continue"}
        onChangeSection={onChangeSection}
        onClickContinue={isLastSection ? onCourseComplete : undefined}
        onClickBackChevron={onClickBackChevron}>
        <CourseVideoContainer
          courseId={course.id}
          videoSection={currentSection}
          initialCurrentVideoTime={initialCurrentVideoTime} />
      </CourseSectionContainer>
    );
  }

  if (currentSection && isQuizSection(currentSection)) {
    return (
      <CourseQuizContainer
        canGoBack={canGoBack}
        courseTitle={course.title}
        quizSection={currentSection}
        isLastSection={isLastSection}
        onChangeSection={onChangeSection}
        onCourseComplete={onCourseComplete}
        onClickBackChevron={onClickBackChevron} />
    );
  }

  return null;
};

export default Course;

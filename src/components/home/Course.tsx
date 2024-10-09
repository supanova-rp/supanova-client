import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Course as CourseType,
  ChangeDirection,
  ID,
  UserCourseProgress,
} from "src/types";
import { getVideoProgressKey } from "src/utils/course-utils";

import { CourseComplete } from "./CourseComplete";
import { CourseQuizContainer } from "./CourseQuizContainer";
import { CourseSummary } from "./CourseSummary";
import CourseVideoContainer from "./CourseVideoContainer";
import Header from "./Header";
import { isQuizSection, isVideoSection } from "../admin/course-form/utils";

interface CoursesProps {
  course: CourseType;
  courseProgress: UserCourseProgress;
}

const Course: React.FC<CoursesProps> = ({ course, courseProgress }) => {
  const navigate = useNavigate();

  const { sections, id: courseId } = course;
  const { currentSectionProgressIndex } = courseProgress;

  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(
    null,
  );
  const [initialCurrentVideoTime, setInitialCurrentVideoTime] =
    useState<number>(0);
  const [isCourseComplete, setCourseComplete] = useState<boolean>(false);

  const currentSection =
    typeof currentSectionIndex === "number"
      ? sections[currentSectionIndex]
      : null;

  const onSelectVideo = (sectionIndex: number) => {
    const sectionId = sections[sectionIndex].id;

    if (localStorage.getItem(`section-progress-${sectionId}`)) {
      const localStorageCurrentVideoTimeValue = JSON.parse(
        localStorage.getItem(`section-progress-${sectionId}`) || "{}",
      ).currentTime;

      setInitialCurrentVideoTime(localStorageCurrentVideoTimeValue);
    } else {
      setInitialCurrentVideoTime(0);
    }

    setCurrentSectionIndex(sectionIndex);
  };

  const onSelectQuiz = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
  };

  const updateInitialCurrentVideoTime = (sectionId: ID) => {
    const key = getVideoProgressKey(courseId, sectionId);

    if (localStorage.getItem(key)) {
      const localStorageCurrentVideoTimeValue = JSON.parse(
        localStorage.getItem(key) || "{}",
      ).currentTime;

      setInitialCurrentVideoTime(localStorageCurrentVideoTimeValue);
    } else {
      setInitialCurrentVideoTime(0);
    }
  };

  const onChangeSection = (direction: ChangeDirection) => {
    const sectionIndex = currentSectionIndex || 0;
    const newSectionIndex =
      direction === "next" ? sectionIndex + 1 : sectionIndex - 1;
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

  const onClickBackSummary = () => {
    navigate("/");
  };

  const onCourseComplete = () => {
    setCourseComplete(true);
  };

  if (isCourseComplete) {
    // TODO: update pdfUrl with actual pdf
    return (
      <CourseComplete pdfUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
    );
  }

  if (!currentSection) {
    return (
      <div className="w-100">
        <Header
          className="default-header"
          title={course.title}
          onClickBack={onClickBackSummary}
        />

        <CourseSummary
          course={course}
          currentSectionProgressIndex={currentSectionProgressIndex}
          onSelectVideo={onSelectVideo}
          onSelectQuiz={onSelectQuiz}
        />
      </div>
    );
  }

  const canGoBack = currentSectionIndex !== 0;
  const isLastSection = currentSectionIndex === sections.length - 1;

  if (currentSection && isVideoSection(currentSection)) {
    return (
      <CourseVideoContainer
        courseId={course.id}
        courseTitle={course.title}
        videoSection={currentSection}
        initialCurrentVideoTime={initialCurrentVideoTime}
        canGoBack={canGoBack}
        isLastSection={isLastSection}
        currentSectionIndex={currentSectionIndex}
        onChangeSection={onChangeSection}
        onCourseComplete={onCourseComplete}
        onClickBackChevron={onClickBackChevron}
      />
    );
  }

  if (currentSection && isQuizSection(currentSection)) {
    return (
      <CourseQuizContainer
        key={currentSection.id} // needed to reset the component when the quiz section changes
        canGoBack={canGoBack}
        courseTitle={course.title}
        quizSection={currentSection}
        isLastSection={isLastSection}
        onChangeSection={onChangeSection}
        onCourseComplete={onCourseComplete}
        onClickBackChevron={onClickBackChevron}
      />
    );
  }

  return null;
};

export default Course;

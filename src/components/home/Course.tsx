import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "src/hooks/useRequest";
import {
  Course as CourseType,
  ChangeDirection,
  ID,
  UserCourseProgress,
  CourseMaterialViewModel,
} from "src/types";
import { getVideoProgressTime } from "src/utils/course-utils";

import { CourseComplete } from "./CourseComplete";
import { CourseIntro } from "./CourseIntro";
import { CourseQuizContainer } from "./CourseQuizContainer";
import { CourseSummary } from "./CourseSummary";
import CourseVideoContainer from "./CourseVideoContainer";
import Header from "./Header";
import { isQuizSection, isVideoSection } from "../admin/course-form/utils";

interface CoursesProps {
  course: CourseType;
  courseProgress: UserCourseProgress;
  courseMaterials: CourseMaterialViewModel[];
  refetchProgress: (shouldLoad?: boolean) => void;
}

const Course: React.FC<CoursesProps> = ({
  course,
  courseProgress,
  courseMaterials,
  refetchProgress,
}) => {
  const navigate = useNavigate();

  // TODO: could refactor to useLazyQuery
  const setCourseCompleted = useRequest("/set-course-completed");

  const { sections } = course;
  const completedSectionIds = courseProgress?.completedSectionIds || [];
  const completedIntro = courseProgress?.completedIntro;

  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(
    null,
  );
  const [initialCurrentVideoTime, setInitialCurrentVideoTime] =
    useState<number>(0);
  const [isCourseComplete, setCourseComplete] = useState<boolean>(false);
  const [isShowingIntroduction, setShowingIntroduction] =
    useState<boolean>(false);
  const [courseCompleteError, setCourseCompleteError] =
    useState<boolean>(false);
  const [courseCompleteLoading, setCourseCompleteLoading] =
    useState<boolean>(false);

  const onSelectVideo = (sectionIndex: number) => {
    const sectionId = sections[sectionIndex].id;
    const storedCurrentTime = getVideoProgressTime(sectionId);

    if (storedCurrentTime) {
      setInitialCurrentVideoTime(storedCurrentTime);
    } else {
      setInitialCurrentVideoTime(0);
    }

    setCurrentSectionIndex(sectionIndex);
  };

  const onSelectIntroduction = () => {
    setShowingIntroduction(true);
  };

  const scrollToTop = () => {
    const containerEl = document.querySelector("#root");
    if (containerEl) {
      containerEl.scrollTo(0, 0);
    }
  };

  const onPressBeginCourse = () => {
    setCurrentSectionIndex(0);
    setShowingIntroduction(false);
    scrollToTop();
    refetchProgress(false);
  };

  const onPressIntroBack = () => {
    setShowingIntroduction(false);
    scrollToTop();
  };

  const onSelectQuiz = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
  };

  const updateInitialCurrentVideoTime = (sectionId: ID) => {
    const storedCurrentTime = getVideoProgressTime(sectionId);

    if (storedCurrentTime) {
      setInitialCurrentVideoTime(storedCurrentTime);
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

    scrollToTop();
  };

  const onClickBackChevron = () => {
    setInitialCurrentVideoTime(0);
    setCurrentSectionIndex(null);
  };

  const onClickBackSummary = () => {
    navigate("/");
  };

  const onCourseComplete = () => {
    setCourseCompleted({
      requestBody: {
        courseId: course.id,
        courseName: course.title,
      },
      onSuccess: () => {
        setCourseComplete(true);
        setCourseCompleteError(false);
        setCourseCompleteLoading(false);
        scrollToTop();
      },
      onError: () => {
        setCourseComplete(true); // Still set course to complete, we'll show the error notification next to CourseComplete card
        setCourseCompleteError(true);
        setCourseCompleteLoading(false);
      },
      onRequestBegin: () => {
        setCourseCompleteError(false);
        setCourseCompleteLoading(true);
      },
    });
  };

  if (isCourseComplete) {
    return (
      <CourseComplete
        course={course}
        error={courseCompleteError}
        loading={courseCompleteLoading}
        onPressTryAgain={onCourseComplete}
      />
    );
  }

  if (isShowingIntroduction) {
    return (
      <CourseIntro
        courseId={course.id}
        courseTitle={course.title}
        onPressBack={onPressIntroBack}
        onPressBeginCourse={onPressBeginCourse}
      />
    );
  }

  if (typeof currentSectionIndex !== "number") {
    return (
      <div className="w-100">
        <Header
          className="default-header"
          title={course.title}
          onClickBack={onClickBackSummary}
        />

        <CourseSummary
          course={course}
          courseMaterials={courseMaterials}
          completedIntro={completedIntro}
          completedSectionIds={completedSectionIds}
          refetchProgress={refetchProgress}
          onSelectIntroduction={onSelectIntroduction}
          onSelectVideo={onSelectVideo}
          onSelectQuiz={onSelectQuiz}
        />
      </div>
    );
  }

  const currentSection = sections[currentSectionIndex];
  const canGoBack = currentSectionIndex !== 0;
  const isLastSection = currentSectionIndex === sections.length - 1;

  const isCurrentSectionCompleted = completedSectionIds.includes(
    currentSection?.id,
  );

  if (currentSection && isVideoSection(currentSection)) {
    return (
      <CourseVideoContainer
        courseId={course.id}
        courseTitle={course.title}
        videoSection={currentSection}
        courseMaterials={courseMaterials}
        initialCurrentVideoTime={initialCurrentVideoTime}
        canGoBack={canGoBack}
        isLastSection={isLastSection}
        isCurrentSectionCompleted={isCurrentSectionCompleted}
        courseCompleteLoading={courseCompleteLoading}
        refetchProgress={refetchProgress}
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
        courseId={course.id}
        canGoBack={canGoBack}
        courseTitle={course.title}
        quizSection={currentSection}
        isLastSection={isLastSection}
        isCurrentSectionCompleted={isCurrentSectionCompleted}
        courseCompleteLoading={courseCompleteLoading}
        refetchProgress={refetchProgress}
        onChangeSection={onChangeSection}
        onCourseComplete={onCourseComplete}
        onClickBackChevron={onClickBackChevron}
      />
    );
  }

  return null;
};

export default Course;

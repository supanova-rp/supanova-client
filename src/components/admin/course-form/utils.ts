import uuid from "react-uuid";
import {
  Course,
  CourseQuizSection,
  CourseSection,
  CourseVideoSection
} from "src/types";

export const isVideoSection = (section: CourseSection): section is CourseVideoSection => {
  return section.videoUrl !== undefined;
};

const isQuizSection = (section: CourseSection): section is CourseQuizSection => {
  return section.questions !== undefined;
};

export const isVideoUploadInProgress = (course: Course) => {
  return course.sections.some((section) => {
    return typeof section.uploadProgress === "number" && section.uploadProgress < 1;
  });
};

export const everySectionHasVideo = (course: Course) => {
  return course.sections.every((section) => section.videoUrl);
};

export const getUpdatedSections = (sections: CourseSection[], sectionId: number, key: string, value: any) => {
  const updatedSections = sections.map((section) => {
    if (sectionId === section.id) {
      return {
        ...section,
        [key]: value,
      };
    }

    return section;
  });

  return updatedSections;
};

export const getUpdatedCourse = (course: Course, sectionId: number, key: string, value: any) => {
  return {
    ...course,
    sections: getUpdatedSections(course.sections, sectionId, key, value),
  };
};

export const getQuizWithNewQuizQuestion = (course: Course, quizId: number) => {
  const updatedSectionsWithNewQuizQuestion = course.sections.map((section) => {
    if (section.id === quizId && isQuizSection(section)) {
      return {
        ...section,
        questions: [
          ...section.questions,
          getInitialEmptyQuizQuestionAndAnswers()
        ]
      };
    }

    return section;
  });

  return {
    ...course,
    sections: updatedSectionsWithNewQuizQuestion
  };
};

export const getInitialEmptyQuizQuestionAndAnswers = () => {
  const emptyQuizAnswers = [];

  for (let i = 0; i < 4; i++) {
    emptyQuizAnswers.push({
      id: uuid(),
      answer: "",
      isCorrectAnswer: false,
    });
  }

  return {
    id: uuid(),
    question: "",
    answers: emptyQuizAnswers,
  };
};

export const getCourseWithNewSection = (course: Course, newSection: CourseSection) => {
  return {
    ...course,
    sections: [
      ...course.sections,
      newSection
    ],
  };
};
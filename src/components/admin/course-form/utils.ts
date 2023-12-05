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

export const isQuizSection = (section: CourseSection): section is CourseQuizSection => {
  return section.videoUrl === undefined;
};

export const isVideoUploadInProgress = (course: Course) => {
  return course.sections.some((section) => {
    return typeof section.uploadProgress === "number" && section.uploadProgress < 1;
  });
};

export const everyVideoSectionHasVideo = (videoSections: CourseVideoSection[]) => {
  return videoSections.every((videoSection) => videoSection.videoUrl);
};

export const everyQuizQuestionHasCorrectAnswer = (quizSections: CourseQuizSection[]) => {
  let everyQuizQuestionHasAtLeast1CorrectAnswer = true;

  for (let i = 0; i < quizSections.length; i++) {
    const currentQuizSection = quizSections[i];

    for (let j = 0; j < currentQuizSection.questions.length; j++) {
      const currentQuizQuestion = currentQuizSection.questions[j];

      if (!currentQuizQuestion.answers.some((quizAnswer) => quizAnswer.isCorrectAnswer)) {
        everyQuizQuestionHasAtLeast1CorrectAnswer = false;
        break;
      }
    }
  }

  return everyQuizQuestionHasAtLeast1CorrectAnswer;
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
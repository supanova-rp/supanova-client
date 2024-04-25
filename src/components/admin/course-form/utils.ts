import uuid from "react-uuid";
import {
  Course,
  CourseQuizAnswer,
  CourseQuizQuestion,
  CourseQuizSection,
  CourseSection,
  CourseVideoSection,
  getUpdatedSectionsKey
} from "src/types";

export type MoveSectionFn = (id: number, direction: "up" | "down") => void

export const isVideoSection = (section: CourseSection): section is CourseVideoSection => {
  return section.videoUrl !== undefined;
};

export const isQuizSection = (section: CourseSection): section is CourseQuizSection => {
  return section.videoUrl === undefined;
};

export const getVideoSections = (course: Course) => {
  return course.sections.filter(isVideoSection);
};

export const getQuizSections = (course: Course) => {
  return course.sections.filter(isQuizSection);
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

export const getInitialCourseState = () => {
  return  {
    id: Date.now(),
    title: "",
    description: "",
    sections: [
      {
        id: Date.now(),
        title: "",
        videoUrl: null,
        uploadProgress: null,
      },
    ],
  };
};

const getDeletedSectionIds = (editedSections: CourseSection[], initialSections: CourseSection[]) => {
  const videoSectionsThatDontExistInEditedSections = initialSections.filter((initialSection) => {
    const sectionExistsInEditedCourse = editedSections.some((editedSection) => {
      return editedSection.id === initialSection.id;
    });

    if (sectionExistsInEditedCourse) {
      return false;
    }

    return true;
  });

  const idsOfDeletedVideoSections = videoSectionsThatDontExistInEditedSections?.map((section) => section.id);

  return idsOfDeletedVideoSections;
};

const getDeletedQuizQuestions = (initialSection: CourseQuizSection, editedSections: CourseQuizSection[]) => {
  const editedSection = editedSections.find((editedSection) => editedSection.id === initialSection.id);

  // if the editedSection was deleted then we return all the questions
  if (!editedSection) {
    return initialSection.questions;
  }

  return initialSection.questions?.filter((initialQuestion) => {
    const questionExistsInEditedCourse = editedSection?.questions?.some((editedQuestion) => {
      return editedQuestion.id === initialQuestion.id;
    });

    if (questionExistsInEditedCourse) {
      return false;
    }

    return true;
  });
};

const getDeletedQuizQuestionIds = (editedSections: CourseQuizSection[], initialSections: CourseQuizSection[]) => {
  const deletedQuizQuestions = initialSections.flatMap((initialSection) => {
    return getDeletedQuizQuestions(initialSection, editedSections);
  });

  const idsOfDeletedQuizQuestions = deletedQuizQuestions?.map((question) => question?.id);

  return idsOfDeletedQuizQuestions;
};

const getDeletedQuizAnswers = (initialSectionQuestion: CourseQuizQuestion, editedSections: CourseQuizSection[]) => {
  let editedQuizQuestion: CourseQuizQuestion | undefined | null;

  editedSections.forEach((editedSection) => {
    editedQuizQuestion = editedSection.questions.find((editedSectionQuestion) => editedSectionQuestion.id === initialSectionQuestion.id);
  });

  if (!editedQuizQuestion) {
    return initialSectionQuestion.answers;
  }

  return initialSectionQuestion.answers.filter((initialSectionAnswer) => {
    const answerExistsInEditedSection = editedQuizQuestion?.answers?.some((editedQuizAnswer: CourseQuizAnswer) => editedQuizAnswer.id === initialSectionAnswer.id);

    if (answerExistsInEditedSection) {
      return false;
    }

    return true;
  });
};

const getDeletedQuizAnswerIds = (editedSections: CourseQuizSection[], initialSections: CourseQuizSection[]) => {
  const deletedQuizAnswers = initialSections.flatMap((initialSection) => {
    return initialSection.questions.flatMap((initialSectionQuestion) => {
      return getDeletedQuizAnswers(initialSectionQuestion, editedSections);
    });
  });

  const idsOfDeletedQuizAnswers = deletedQuizAnswers?.map((quizAnswer) => quizAnswer?.id);

  return idsOfDeletedQuizAnswers;
};

export const getDeletedSectionsIds = (course: Course, initialCourse: Course) => {
  const idsOfDeletedVideoSections = getDeletedSectionIds(getVideoSections(course), getVideoSections(initialCourse));
  const idsOfDeletedQuizSections = getDeletedSectionIds(getQuizSections(course), getQuizSections(initialCourse));
  const idsOfDeletedQuizQuestions = getDeletedQuizQuestionIds(getQuizSections(course), getQuizSections(initialCourse));
  const idsOfDeletedQuizAnswers = getDeletedQuizAnswerIds(getQuizSections(course), getQuizSections(initialCourse));

  return {
    videoSectionIds: idsOfDeletedVideoSections,
    quizSectionIds: idsOfDeletedQuizSections,
    questionIds: idsOfDeletedQuizQuestions,
    answerIds: idsOfDeletedQuizAnswers,
  };
};

export const getSectionsWithPositions = (course: Course) => {
  const sectionsWithPositions = course.sections.map((section, sectionIndex) => {
    if (section?.questions) {
      const quizQuestionsWithPositions = section.questions.map((quizQuestion, quizQuestionIndex) => {
        return {
          ...quizQuestion,
          position: quizQuestionIndex,
        };
      });

      return {
        ...section,
        position: sectionIndex,
        questions: quizQuestionsWithPositions
      };
    }

    return {
      ...section,
      position: sectionIndex,
    };
  });

  return sectionsWithPositions;
};

export const getUpdatedSections = (sections: CourseSection[], sectionId: number, key: getUpdatedSectionsKey, value: any) => {
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

export const getUpdatedCourse = (course: Course, sectionId: number, key: getUpdatedSectionsKey, value: any) => {
  return {
    ...course,
    sections: getUpdatedSections(course.sections, sectionId, key, value),
  };
};

export const getQuizWithNewQuizQuestion = (course: Course, quizId: number, isEditing: boolean) => {
  const updatedSectionsWithNewQuizQuestion = course.sections.map((section) => {
    if (section.id === quizId && isQuizSection(section)) {
      return {
        ...section,
        questions: [
          ...section.questions,
          getInitialEmptyQuizQuestionAndAnswers(isEditing)
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

export const getInitialEmptyQuizQuestionAndAnswers = (isEditing: boolean) => {
  const emptyQuizAnswers = [];

  for (let i = 0; i < 4; i++) {
    emptyQuizAnswers.push({
      id: uuid(),
      answer: "",
      isNewAnswer: isEditing,
      isCorrectAnswer: false,
    });
  }

  return {
    id: uuid(),
    question: "",
    isNewQuestion: isEditing,
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
import uuid from "react-uuid";
import {
  Course,
  CourseMaterial,
  CourseQuizQuestion,
  CourseQuizSection,
  CourseSection,
  CourseVideoSection,
  ID,
  SectionTypes,
  getUpdatedSectionsKey,
} from "src/types";

export type MoveSectionFn = (id: ID, direction: "up" | "down") => void;

export const isVideoSection = (
  section: CourseSection,
): section is CourseVideoSection => {
  return section.videoUrl !== undefined;
};

export const isQuizSection = (
  section: CourseSection,
): section is CourseQuizSection => {
  return section.videoUrl === undefined;
};

export const getVideoSections = (course: Course) => {
  return course.sections.filter(isVideoSection);
};

export const getQuizSections = (course: Course) => {
  return course.sections.filter(isQuizSection);
};

export const isVideoUploadInProgress = (course: Course) => {
  return course.sections.some(section => {
    return (
      typeof section.uploadProgress === "number" && section.uploadProgress < 1
    );
  });
};

export const everyVideoSectionHasVideo = (
  videoSections: CourseVideoSection[],
) => {
  return videoSections.every(videoSection => videoSection.videoUrl);
};

export const everyQuizQuestionHasCorrectAnswer = (
  quizSections: CourseQuizSection[],
) => {
  let everyQuizQuestionHasAtLeast1CorrectAnswer = true;

  for (let i = 0; i < quizSections.length; i++) {
    const currentQuizSection = quizSections[i];

    for (let j = 0; j < currentQuizSection.questions.length; j++) {
      const currentQuizQuestion = currentQuizSection.questions[j];

      if (
        !currentQuizQuestion.answers.some(
          quizAnswer => quizAnswer.isCorrectAnswer, // TODO: check
        )
      ) {
        everyQuizQuestionHasAtLeast1CorrectAnswer = false;
        break;
      }
    }
  }

  return everyQuizQuestionHasAtLeast1CorrectAnswer;
};

export const getInitialCourseState = (): Course => {
  return {
    id: uuid(),
    title: "",
    description: "",
    materials: [],
    sections: [
      {
        id: `${Date.now()}`,
        title: "",
        type: SectionTypes.Video,
        videoUrl: "",
        uploadProgress: null,
      },
    ],
  };
};

const getDeletedIds = (
  idsBeforeEdit: (string | number)[],
  idsAfterEdit: (string | number)[],
) => {
  // any ID that existed before editing (i.e. in idsBeforeEdit) but does not
  // exist after editing (i.e. in idsAfterEdit) must have been removed
  // (whether that is because an entire section was removed, an entire question, or just a single answer)
  return idsBeforeEdit.filter(idBeforeEdit => {
    return !idsAfterEdit.includes(idBeforeEdit);
  });
};

const getDeletedSectionIds = (
  editedSections: CourseSection[],
  initialSections: CourseSection[],
) => {
  const allSectionIDsBeforeEdit = initialSections.map(section => {
    return section.id;
  });

  const allSectionIDsAfterEdit = editedSections.flatMap(section => {
    return section.id;
  });

  return getDeletedIds(allSectionIDsBeforeEdit, allSectionIDsAfterEdit);
};

const getDeletedQuizQuestionIds = (
  editedSections: CourseQuizSection[],
  initialSections: CourseQuizSection[],
) => {
  const allQuestionIDsBeforeEdit = initialSections.flatMap(section => {
    return section.questions.flatMap(question => {
      return question.id;
    });
  });

  const allQuestionIDsAfterEdit = editedSections.flatMap(section => {
    return section.questions.flatMap(question => {
      return question.id;
    });
  });

  return getDeletedIds(allQuestionIDsBeforeEdit, allQuestionIDsAfterEdit);
};

const getDeletedQuizAnswerIds = (
  editedSections: CourseQuizSection[],
  initialSections: CourseQuizSection[],
) => {
  const allAnswerIDsBeforeEdit = initialSections.flatMap(section => {
    return section.questions.flatMap(question => {
      return question.answers.flatMap(answer => answer.id);
    });
  });

  const allAnswerIDsAfterEdit = editedSections.flatMap(section => {
    return section.questions.flatMap(question => {
      return question.answers.flatMap(answer => answer.id);
    });
  });

  return getDeletedIds(allAnswerIDsBeforeEdit, allAnswerIDsAfterEdit);
};

export const getDeletedSectionsIds = (
  course: Course,
  initialCourse: Course,
) => {
  const idsOfDeletedVideoSections = getDeletedSectionIds(
    getVideoSections(course),
    getVideoSections(initialCourse),
  );
  const idsOfDeletedQuizSections = getDeletedSectionIds(
    getQuizSections(course),
    getQuizSections(initialCourse),
  );
  const idsOfDeletedQuizQuestions = getDeletedQuizQuestionIds(
    getQuizSections(course),
    getQuizSections(initialCourse),
  );
  const idsOfDeletedQuizAnswers = getDeletedQuizAnswerIds(
    getQuizSections(course),
    getQuizSections(initialCourse),
  );

  return {
    videoSectionIds: idsOfDeletedVideoSections,
    quizSectionIds: idsOfDeletedQuizSections,
    questionIds: idsOfDeletedQuizQuestions,
    answerIds: idsOfDeletedQuizAnswers,
  };
};

const addPositionField = <T>(items: T[] = []) => {
  return items.map((item, itemIndex) => {
    return {
      ...item,
      position: itemIndex,
    };
  });
};

export const getSectionsWithPositions = (course: Course) => {
  const sectionsWithPositions = course.sections.map((section, sectionIndex) => {
    if (section?.questions) {
      const quizQuestionsWithPositions = section.questions.map(
        (quizQuestion, quizQuestionIndex) => {
          const answersWithPosition = addPositionField(quizQuestion.answers);

          return {
            ...quizQuestion,
            answers: answersWithPosition,
            position: quizQuestionIndex,
          };
        },
      );

      return {
        ...section,
        position: sectionIndex,
        questions: quizQuestionsWithPositions,
      };
    }

    return {
      ...section,
      position: sectionIndex,
    };
  });

  return sectionsWithPositions;
};

export const getMaterialsWithPosition = (course: Course): CourseMaterial[] => {
  return course.materials.map((material, materialIndex) => {
    return {
      ...material,
      position: materialIndex,
    };
  });
};

export const getUpdatedSections = (
  sections: CourseSection[],
  sectionId: ID,
  key: getUpdatedSectionsKey,
  value: any,
) => {
  const updatedSections = sections.map(section => {
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

export const getUpdatedCourse = (
  course: Course,
  sectionId: ID,
  key: getUpdatedSectionsKey,
  value: any,
) => {
  return {
    ...course,
    sections: getUpdatedSections(course.sections, sectionId, key, value),
  };
};

export const getInitialEmptyQuizQuestionAndAnswers = (
  isEditing: boolean,
): CourseQuizQuestion => {
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
    isMultiAnswer: false,
    isNewQuestion: isEditing,
    answers: emptyQuizAnswers,
  };
};

export const getCourseWithNewQuizQuestion = (
  course: Course,
  quizId: ID,
  isEditing: boolean,
): Course => {
  const updatedSectionsWithNewQuizQuestion = course.sections.map(section => {
    if (section.id === quizId && isQuizSection(section)) {
      return {
        ...section,
        questions: [
          ...section.questions,
          getInitialEmptyQuizQuestionAndAnswers(isEditing),
        ],
      };
    }

    return section;
  });

  return {
    ...course,
    sections: updatedSectionsWithNewQuizQuestion,
  };
};

export const getCourseWithNewSection = (
  course: Course,
  newSection: CourseSection,
) => {
  return {
    ...course,
    sections: [...course.sections, newSection],
  };
};

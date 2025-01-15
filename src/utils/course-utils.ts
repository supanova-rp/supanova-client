import {
  CourseQuizSection,
  CourseSection,
  CourseVideoSection,
  ID,
  QuizProgressState,
  SectionTypes,
} from "src/types";

export const getIsVideoSection = (
  section: CourseSection,
): section is CourseVideoSection => {
  return section.type === SectionTypes.Video;
};

export const getIsQuizSection = (
  section: CourseSection,
): section is CourseQuizSection => {
  return section.type === SectionTypes.Quiz;
};

export const getVideoProgressKey = (sectionId: ID) => {
  return `section-progress-${sectionId}`;
};

export const getVideoProgressTime = (sectionId: ID) => {
  const item = localStorage.getItem(getVideoProgressKey(sectionId));

  return JSON.parse(item || "{}").currentTime;
};

export const setVideoProgressTime = (sectionId: ID, time: number) => {
  localStorage.setItem(
    getVideoProgressKey(sectionId),
    JSON.stringify({ currentTime: time }),
  );
};

export const resetVideoProgressTime = (sectionId: ID) => {
  localStorage.removeItem(getVideoProgressKey(sectionId));
};

export const getQuizProgressKey = (quizSectionId: ID) => {
  return `quiz-progress-${quizSectionId}`;
};

export const getQuizProgress = (
  quizSectionId: ID,
): QuizProgressState | null => {
  const item = localStorage.getItem(getQuizProgressKey(quizSectionId));

  if (item) {
    return JSON.parse(item) as QuizProgressState;
  }

  return null;
};

export const setQuizProgress = (
  quizSectionId: ID,
  quizState: QuizProgressState,
) => {
  localStorage.setItem(
    getQuizProgressKey(quizSectionId),
    JSON.stringify(quizState),
  );
};

export const resetQuizProgress = (quizSectionId: ID) => {
  localStorage.removeItem(getQuizProgressKey(quizSectionId));
};

export const getQuizProgressInitialState = (
  quizSection: CourseQuizSection,
): QuizProgressState => {
  const progress = getQuizProgress(quizSection.id);

  if (progress) {
    return progress;
  }

  return new Array(quizSection.questions.length).fill([]);
};

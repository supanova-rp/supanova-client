import {
  CourseQuizSection,
  CourseSection,
  CourseVideoSection,
  ID,
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

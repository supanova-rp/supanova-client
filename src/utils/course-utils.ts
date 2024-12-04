import { CourseSection, CourseVideoSection, ID, SectionTypes } from "src/types";

export const getIsVideoSection = (
  section: CourseSection,
): section is CourseVideoSection => {
  return section.type === SectionTypes.Video;
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

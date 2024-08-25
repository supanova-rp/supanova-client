import { CourseSection, CourseVideoSection, ID, SectionTypes } from "src/types";

export const getIsVideoSection = (
  section: CourseSection,
): section is CourseVideoSection => {
  return section.type === SectionTypes.Video;
};

export const getVideoProgressKey = (courseId: number, sectionId: ID) => {
  return `section-progress-${courseId}-${sectionId}`;
};

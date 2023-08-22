import { defaultCourses } from './test-constants';

const courses = defaultCourses;

export const getHasNext = (currentSectionIndex, currentCourseIndex) => {
  return currentSectionIndex + 1 !== courses[currentCourseIndex].sections.length;
}

const getHasPrev = (currentSectionIndex) => {
  return currentSectionIndex !== 0;
}

export const getHasNextAndPrev = (currentSectionIndex, currentCourseIndex) => {
  return getHasNext(currentSectionIndex, currentCourseIndex) && getHasPrev(currentSectionIndex);
}
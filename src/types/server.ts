// Holds types only for responses from server.
// Currently does not include every server response type, some are still in types/index.ts

import { CourseQuizSection, ID, SectionTypes } from ".";

export type CourseServerModel = {
  id: ID;
  title: string;
  description: string;
  completionTitle: string;
  completionMessage: string;
  sections: CourseSectionServerModel[];
  materials: CourseMaterialServerModel[];
};

export type CourseSectionServerModel =
  | CourseVideoSectionServerModel
  | CourseQuizSection; // TODO: replace with CourseQuizSectionServerModel (later)

export type CourseVideoSectionServerModel = {
  id: ID;
  type: SectionTypes;
  title: string;
  storageKey: string;
  questions?: never;
};

export type CourseMaterialServerModel = {
  id: ID;
  name: string;
  storageKey: string;
};

export type CourseVideoServerModel = {
  url: string;
};

export type CourseQuizSectionServerModel = {
  id: ID;
  title: string;
  position: number;
  type: SectionTypes.Quiz;
  questions: CourseQuizQuestionServerModel[];
};

export type CourseQuizQuestionServerModel = {
  id: ID;
  question: string;
  position: number;
  isMultiAnswer: boolean;
  answers: CourseQuizAnswerServerModel[];
};

export type CourseQuizAnswerServerModel = {
  id: ID;
  answer: string;
  position: number;
  isCorrectAnswer: boolean;
};

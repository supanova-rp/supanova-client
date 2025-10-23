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
  | CourseQuizSection; // TODO: add ServerModel for this later

export type CourseVideoSectionServerModel = {
  id: ID;
  type: SectionTypes;
  title: string;
  videoUrl: string | null;
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

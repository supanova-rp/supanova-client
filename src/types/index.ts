import { User as FirebaseUserLib } from "firebase/auth";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { ADMINS_TABS } from "src/constants/constants";

type AdminTabKey = keyof typeof ADMINS_TABS;
export type AdminTabValue = (typeof ADMINS_TABS)[AdminTabKey];
export type setActiveTabFunction = Dispatch<SetStateAction<AdminTabValue>>;

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type InputChangeFunction = (e: InputChangeEvent) => void;

export type UploadProgress = number | null | undefined;

export type SaveFormEndpoint = "/edit-course" | "/add-course";

export type Course = {
  id: number;
  title: string;
  description: string;
  sections: CourseSection[];
};

export type CourseTitle = {
  id: number;
  title: string;
};

export type onChangeCourseFieldKey = "description" | "title";

export type CourseSection = CourseVideoSection | CourseQuizSection;

export enum SectionTypes {
  Video = "video",
  Quiz = "quiz",
}

export type CourseVideoSection = {
  id: ID;
  type: SectionTypes;
  title: string;
  videoUrl: string | null;
  isNewSection?: boolean;
  uploadProgress?: UploadProgress;
  questions?: never;
};

export type CourseQuizSection = {
  id: ID;
  type: SectionTypes;
  questions: CourseQuizQuestion[];
  isNewSection: boolean;
  title?: never;
  uploadProgress?: never;
  videoUrl?: never;
};

export type CourseQuizQuestion = {
  id: ID;
  question: string;
  isNewQuestion: boolean;
  answers: CourseQuizAnswer[];
};

export type CourseQuizQuestionServer = {
  id: ID;
  question: string;
  position: number;
  quizSectionId: ID;
  answers: CourseQuizAnswer[];
};

export type CourseQuizAnswer = {
  id: ID;
  answer: string;
  isCorrectAnswer: boolean;
  isNewAnswer?: boolean;
};

export type ChangeDirection = "next" | "prev";

export type ErrorOptions = {
  message: null | string;
  type: null | string;
  error?: null | string;
};

export type getUpdatedSectionsKey =
  | "title"
  | "videoUrl"
  | "uploadProgress"
  | "questions";

export type User = {
  id: string;
  name: string;
  email: string;
  added: boolean;
  addUserError: boolean;
  alreadyRegistered: boolean;
};

export type UserToCourses = {
  id: string;
  name: string;
  email: string;
  courseIds: number[];
};

export type UserCourseProgress = {
  completedSectionIds: ID[];
};

export enum SectionProgressState {
  Completed = "completed",
  Current = "current",
  Locked = "locked",
  Empty = "empty", // Edge case state that would only happen if a new section is added after user has already made progress further than the new section
}

export type UserInfoToUpdate = {
  added?: boolean;
  addUserError?: boolean;
  alreadyRegistered?: boolean;
};

export type PasswordsShowing = {
  password: boolean;
  repeatPassword: boolean;
};

export type FirebaseUser = FirebaseUserLib & { accessToken?: string };

export type UploadUrlResponse = {
  uploadUrl: string;
};

export type EditCoursesRequestBody = {
  edited_course_id?: number;
  course?: Course;
  deleted_section_ids_map?: DeletedSectionIdsMap;
};

type DeletedSectionIdsMap = {
  videoSectionIds: number[] | [];
  quizSectionIds: number[] | [];
  questionIds: number[] | [];
  answerIds: number[] | [];
};

export type RequestBody = {
  title?: string;
  description?: string;
  sections?: CourseSection[];
  edited_course_id?: number;
  edited_course?: Course;
  deleted_sections_ids?: DeletedSectionIdsMap;
};

export type RequestOptions = {
  requestBody: RequestBody;
  endpoint: string;
  method: string;
};

export type MobileNavbarIcon = {
  icon: FunctionComponent;
  tabName: string | null;
  id: number;
};

export type ID = string;

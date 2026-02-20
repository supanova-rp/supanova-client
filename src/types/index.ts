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
  id: ID;
  title: string;
  description: string;
  completionTitle: string;
  completionMessage: string;
  sections: CourseSection[];
  materials: CourseMaterial[];
};

export type CourseTitle = {
  id: number;
  title: string;
};

export type onChangeCourseFieldKey =
  | "description"
  | "title"
  | "completionTitle"
  | "completionMessage";

// TODO: separate an editable course material type from viewable one (currently CourseMaterialViewModel)
export type CourseMaterial = {
  id: ID;
  name: string;
  storageKey: string;
  storageKeyBeingUploaded: string; // If upload is cancelled, this will be reset. If upload finishes it is moved to storageKey
  uploadProgress?: UploadProgress;
  uploaded: boolean;
};

export type CourseMaterialViewModel = {
  id: ID;
  name: string;
  url: string;
};

export type CourseSection = CourseVideoSection | CourseQuizSection;

export enum SectionTypes {
  Video = "video",
  Quiz = "quiz",
}

export type CourseVideoSection = {
  id: ID;
  type: SectionTypes;
  title: string;
  storageKey: string;
  storageKeyBeingUploaded: string; // If upload is cancelled, this will be reset. If upload finishes it is moved to storageKey
  isNewSection: boolean;
  uploadProgress?: UploadProgress;
  uploaded: boolean;
  questions?: never;
};

export type CourseQuizSection = {
  id: ID;
  type: SectionTypes;
  questions: CourseQuizQuestion[];
  isNewSection: boolean;
};

export type CourseQuizQuestion = {
  id: ID;
  question: string;
  isMultiAnswer: boolean;
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

export type QuizAnswerIndex = number;
export type QuizSelectedAnswers = QuizAnswerIndex[];
export type QuizProgressState = QuizSelectedAnswers[];
export type QuizStateResponse = {
  quizId?: string;
  quizState?: QuizSelectedAnswers[];
  attempts?: number;
};

export type ChangeDirection = "next" | "prev";

export type ErrorOptions = {
  message: null | string;
  type: null | string;
  error?: null | string;
};

export type SectionFieldKeys =
  | "title"
  | "uploadProgress"
  | "uploaded"
  | "storageKey"
  | "questions";

export type UserToCourses = {
  id: string;
  name: string;
  email: string;
  courseIds: number[];
};

export type UserCourseProgress = {
  completedIntro: boolean;
  completedSectionIds: ID[];
};

export enum SectionProgressState {
  Completed = "completed",
  Current = "current",
  Locked = "locked",
  Empty = "empty", // Edge case state that would only happen if a new section is added after user has already made progress further than the new section
}

export type PasswordsShowing = {
  password: boolean;
  repeatPassword: boolean;
};

export type FirebaseUser = FirebaseUserLib & { accessToken?: string };

export type UploadUrlResponse = {
  uploadUrl: string;
};

export type EditCoursesRequestBody = {
  edited_course_id?: ID;
  course?: Course;
  deleted_section_ids_map?: DeletedSectionIdsMap;
};

type DeletedSectionIdsMap = {
  videoSectionIds: ID[] | [];
  quizSectionIds: ID[] | [];
  questionIds: ID[] | [];
  answerIds: ID[] | [];
};

export type RequestBody = {
  title?: string;
  description?: string;
  sections?: CourseSection[];
  edited_course_id?: ID;
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

export enum FileUploadType {
  Video = "video",
  Material = "material",
}

export type ProgressAdminView = {
  userID: ID;
  name: string;
  email: string;
  progress: ProgressForCourseAdminView[];
};

export type ProgressForCourseAdminView = {
  courseID: ID;
  courseName: string;
  completedIntro: boolean;
  completedCourse: boolean;
  courseSectionProgress: CourseSectionProgress[];
};

export type QuizAttemptHistory = {
  quizID: ID;
  total: number;
  attempts: QuizAttempt[];
};

export type QuizAttempt = {
  attemptNumber: number;
  attemptData: AttemptData;
};

export type AttemptData = {
  quizID: ID;
  questions: QuizAttemptQuestion[];
};

export type QuizAttemptQuestion = {
  questionID: ID;
  selectedAnswerIDs: ID[];
  correct: boolean;
};

export type CourseSectionProgress = {
  id: ID;
  title: string;
  type: string;
  completed: boolean;
};

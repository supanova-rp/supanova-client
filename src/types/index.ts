import { User as FirebaseUserLib } from "firebase/auth";

export type SetStringFunction = (parameter: string) => void;

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

export type InputChangeFunction = (e: InputChangeEvent) => void;

export type UploadProgress = number | null | undefined;

export type Course = {
  id: number,
  title: string,
  description: string,
  sections: CourseSection[],
};

export type CourseTitle = {
  id: number,
  title: string,
}

export type CourseSection = CourseVideoSection | CourseQuizSection

export type CourseVideoSection = {
  id: number,
  title: string,
  videoUrl: string | null,
  isNewSection?: boolean,
  uploadProgress?: UploadProgress,
  completed?: boolean,
  questions?: never,
};

export type CourseQuizSection = {
  id: number,
  questions: CourseQuizQuestion[],
  isNewSection: boolean,
  title?: never,
  uploadProgress?: never,
  completed?: never,
  videoUrl?: never,
}

export type CourseQuizQuestion = {
  id: string,
  question: string,
  answers: CourseQuizAnswer[],
}

export type CourseQuizAnswer = {
  id: string,
  answer: string,
  isCorrectAnswer: boolean,
}

export type ErrorOptions = {
  message: null | string,
  type: null | string,
  error?: null | string,
}

export type User = {
  id: string
  name: string,
  email: string,
  added: boolean,
  addUserError: boolean,
  alreadyRegistered: boolean,
};

export type UserToCourses = {
  id: string,
  name: string,
  email: string,
  courseIds: number[],
}

export type UserInfoToUpdate = {
  added?: boolean,
  addUserError?: boolean,
  alreadyRegistered?: boolean,
};

export type FirebaseUser = FirebaseUserLib & {accessToken?: string}

export type UploadUrlResponse = {
  uploadUrl: string,
}

export type EditCoursesRequestBody = {
  edited_course_id?: number,
  course?: Course,
  deleted_sections_ids?: number[] | [],
}

export type RequestBody = {
  title?: string,
  description?: string,
  sections?: CourseSection[],
  edited_course_id?: number,
  edited_course?: Course,
  deleted_sections_ids?: number[] | [],
}

export type RequestOptions = {
  requestBody: RequestBody,
  endpoint: string,
  method: string,
}
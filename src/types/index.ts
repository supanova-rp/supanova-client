import { User as FirebaseUserLib } from "firebase/auth";

export type SetStringFunction = (parameter: string) => void;

export interface LogoutErrorProps {
  logoutError: null | string,
}

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

export type CourseSection = {
  id: number,
  title: string,
  videoUrl: string | null,
  uploadProgress?: UploadProgress,
  completed?: boolean,
};

export type ErrorOptions = {
  message: null | string,
  type: null | string,
  error?: null | string,
}

export type User = {
  id: string
  name: string,
  email: string,
  registered: boolean,
  regError: boolean,
  hasPasswordResetError: boolean,
};

export type UserInfoToUpdate = {
  registered?: boolean,
  regError?: boolean,
  hasPasswordResetError?: boolean,
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
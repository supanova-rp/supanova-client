import { User as FirebaseUserLib} from "firebase/auth";

export type SetStringFunction = (parameter: string) => void;

export interface LogoutErrorProps {
  logoutError: string,
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

export type InputChangeFunction = (e: InputChangeEvent) => void;

export type UploadProgress = number | null | undefined;

export type CourseSection = {
  id: number,
  title: string,
  videoUrl: string | null,
  uploadProgress?: UploadProgress,
  completed?: boolean,
};

export type Course = {
  id: number,
  title: string,
  description: string,
  isEditing?: boolean,
  sections: CourseSection[],
  loading?: boolean,
  errorMessage?: string | null,
  successMessage?: string | null,
};

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

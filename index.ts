export type SetStringFunction = (parameter: string) => void;

export interface LogoutErrorProps {
  logoutError: string,
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type InputChangeFunction = (e: InputChangeEvent) => void;

export type CourseSection = {
  id: number,
  title: string,
  videoName?: string,
  videoUrl: string | null,
  uploadProgress?: number | null,
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

export type Users = User[];

export type UserInfoToUpdate = {
  registered?: boolean,
  regError?: boolean,
  hasPasswordResetError?: boolean,
};

export type CurrentVideo = {
  courseIndex: number,
  courseTitle: string,
  sectionIndex: number,
  sectionTitle: string,
  videoUrl: string
};

export type VideoState = null | CurrentVideo;

export type SetStringFunction = (parameter: string) => void;

export interface LogoutErrorProps {
  logoutError: string,
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type InputChangeFunction = (e: InputChangeEvent) => void;

export type Video = {
  name: string,
  url: string | null,
  uploadProgress: number | null,
};
export type Section = {
  id: string,
  title: string,
  video: Video,
};

export type Sections = Section[];

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

export type ServerSideSection = {
  section_id: number,
  section_title: string,
  video_url: string
};

export type ServerSideCourse = {
  course_id: number,
  course_title: string,
  description: string,
  sections: ServerSideSection[],
  isEditing?: boolean,
};

export type ServerSideCourses = ServerSideCourse[];

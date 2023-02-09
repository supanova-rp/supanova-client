export type SetStringFunction = (parameter: string) => void;

export interface LogoutErrorProps {
  logoutError: string,
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type InputChangeFunction = (e: InputChangeEvent) => void;

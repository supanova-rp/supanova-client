import { Dispatch, SetStateAction } from "react";

import { FormSubmitEvent } from "src/types";

import AuthFormBody from "./AuthFormBody";

interface Props {
  title: string,
  validationError: string,
  successMessage?: string,
  emailInput: string,
  cardClassname: string,
  alertClassname?: string,
  buttonText: string,
  footerText: string,
  footerPath: string,
  isLoading: boolean,
  AdditionalInputFields?: React.ReactNode,
  onSubmit: (event: FormSubmitEvent) => Promise<void>,
  setEmailInput: Dispatch<SetStateAction<string>>
}

const AuthForm: React.FC<Props> = ({
  title,
  validationError,
  cardClassname,
  alertClassname,
  buttonText,
  footerText,
  footerPath,
  successMessage,
  isLoading,
  emailInput,
  AdditionalInputFields,
  onSubmit,
  setEmailInput
}) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center login-container">
      <AuthFormBody
        isLoading={isLoading}
        title={title}
        cardClassname={cardClassname}
        alertClassname={alertClassname}
        buttonText={buttonText}
        footerPath={footerPath}
        footerText={footerText}
        successMessage={successMessage}
        emailInput={emailInput}
        validationError={validationError}
        AdditionalInputFields={AdditionalInputFields}
        onSubmit={onSubmit}
        setEmailInput={setEmailInput}/>
    </div>
  );
};

export default AuthForm;
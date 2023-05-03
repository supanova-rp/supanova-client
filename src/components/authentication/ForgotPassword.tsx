import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { FormSubmitEvent } from "../../types/index";

import AuthForm from "./AuthForm";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [validationError, setValidationError] = useState("");
  const [resetPasswordSuccessMessage, setResetPasswordSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  // TODO: change the sender e-mail for reset password

  const handleSuccessMessageAfterResettingPassword = () => {
    setTimeout(() => {
      setResetPasswordSuccessMessage("");
    }, 3000);
  };

  const onHandleResetPassword = async (event: FormSubmitEvent) => {
    event.preventDefault();

    try {
      setValidationError("");
      setIsLoading(true);

      await resetPassword(emailInput);
      setResetPasswordSuccessMessage("Check your inbox for further instructions.");

      handleSuccessMessageAfterResettingPassword();
    } catch (error) {
      console.log(error);
      setResetPasswordSuccessMessage("");
      setValidationError("Failed to reset password.");
    }

    setIsLoading(false);
  };

  return (
    <AuthForm
      cardClassname="forgot-password-card"
      isLoading={isLoading}
      title="Password Reset"
      validationError={validationError}
      emailInput={emailInput}
      successMessage={resetPasswordSuccessMessage}
      alertClassname="forgot-password-alert"
      buttonText="Reset Password"
      footerText="Log in"
      footerPath="/login"
      onSubmit={onHandleResetPassword}
      setEmailInput={setEmailInput}/>
  );
};

export default ForgotPassword;

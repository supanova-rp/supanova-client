import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { FormSubmitEvent } from "../../types/index";

import AuthCard from "./AuthCard";
import FormInput from "../FormInput";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");
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
      setError("");
      setIsLoading(true);

      await resetPassword(emailInput);
      setResetPasswordSuccessMessage("Check your inbox for further instructions.");

      handleSuccessMessageAfterResettingPassword();
    } catch (error: any) {
      console.log(error);
      setResetPasswordSuccessMessage("");

      if (error.code === "auth/user-not-found") {
        setError("Account doesn't exist. Please register first");
      } else {
        setError("Failed to reset password.");
      }
    }

    setIsLoading(false);
  };

  return (
    <AuthCard
      cardClassname="forgot-password-card"
      title="Forgot password?"
      subTitle="Reset your password below"
      isLoading={isLoading}
      error={error}
      successMessage={resetPasswordSuccessMessage}
      alertClassname="forgot-password-alert"
      buttonText="Reset password"
      onSubmit={onHandleResetPassword}
      footerText="Have an account?"
      footerLinkText="Login"
      footerLinkPath="/login">
      <FormInput
        formId="email"
        formGroupClassname="mb-2 pe-4"
        inputContainerClassname="text-input"
        label="Email"
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}/>
    </AuthCard>
  );

};

export default ForgotPassword;

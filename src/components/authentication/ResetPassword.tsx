import { useState } from "react";
import toast from "react-hot-toast";
import {
  REACT_TOAST_DURATION,
  feedbackMessages,
} from "src/constants/constants";

import AuthCard from "./AuthCard";
import { useAuth } from "../../contexts/AuthContext";
import { FormSubmitEvent } from "../../types/index";
import FormInput from "../FormInput";

const ResetPassword = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { resetPassword } = useAuth();

  const onHandleResetPassword = async (event: FormSubmitEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      await resetPassword(emailInput);
      toast.success(
        feedbackMessages.passwordResetSuccess,
        REACT_TOAST_DURATION,
      );
    } catch (error: any) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
        toast.error(feedbackMessages.accountInvalid, REACT_TOAST_DURATION);
      } else {
        toast.error(feedbackMessages.passwordResetError, REACT_TOAST_DURATION);
      }
    }

    setIsLoading(false);
  };

  return (
    <AuthCard
      cardClassname="reset-password-card"
      title="Reset password"
      subTitle="Reset your password below"
      isLoading={isLoading}
      buttonText="Reset password"
      buttonClassName="reset-password-button"
      onSubmit={onHandleResetPassword}
      footerText="Have an account?"
      footerLinkText="Login"
      footerLinkPath="/login"
    >
      <FormInput
        formId="email"
        formGroupClassname="mb-4 reset-password-form"
        inputContainerClassname="text-input"
        label="Email"
        type="email"
        value={emailInput}
        onChange={e => setEmailInput(e.target.value)}
      />
    </AuthCard>
  );
};

export default ResetPassword;

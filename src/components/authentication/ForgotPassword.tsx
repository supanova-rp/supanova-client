import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../contexts/AuthContext";
import { FormSubmitEvent } from "../../types/index";
import { feedbackMessages } from "src/constants/constants";

import AuthCard from "./AuthCard";
import FormInput from "../FormInput";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  const onHandleResetPassword = async (event: FormSubmitEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      await resetPassword(emailInput);
      toast.success(feedbackMessages.passwordResetSuccess);

    } catch (error: any) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
        toast.error(feedbackMessages.accountInvalid);
      } else {
        toast.error(feedbackMessages.passwordResetError);
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
      buttonText="Reset password"
      onSubmit={onHandleResetPassword}
      footerText="Have an account?"
      footerLinkText="Login"
      footerLinkPath="/login">
      <FormInput
        formId="email"
        formGroupClassname="mb-2 pe-4"
        inputContainerClassname="text-input forgot-password-input"
        label="Email"
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}/>
    </AuthCard>
  );

};

export default ForgotPassword;

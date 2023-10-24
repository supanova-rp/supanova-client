import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../contexts/AuthContext";
import { FormSubmitEvent } from "../../types/index";

import AuthCard from "./AuthCard";
import FormInput from "../FormInput";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  // TODO: change the sender e-mail for reset password

  const onHandleResetPassword = async (event: FormSubmitEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      await resetPassword(emailInput);
      toast.success("Password reset. Check your inbox.");

    } catch (error: any) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
        toast.error("Account doesn't exist. Please register first.");
      } else {
        toast.error("Failed to reset password.");
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

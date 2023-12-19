import { useState } from "react";
import toast from "react-hot-toast";

import { FormSubmitEvent } from "src/types";
import { useAuth } from "src/contexts/AuthContext";
import useRequest from "src/hooks/useRequest";
import { feedbackMessages } from "src/constants/constants";
import { ReactComponent as WarningIcon } from "../../icons/warningIcon.svg";

import FormInput from "../FormInput";
import AuthCard from "./AuthCard";
import PasswordVisibilityIcon from "./PasswordVisibilityIcon";

const Register = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [repeatPasswordInput, setRepeatPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState({ password: false, repeatPassword: false });

  const registerUser = useRequest("/register");
  const { login } = useAuth();

  const formGroupClassname = "mb-2 pe-4";

  const onError = (errorName: string, error: any) => {
    console.log(`${errorName}: ${error}`);
    if (error.code === "auth/email-already-in-use") {
      toast.error(feedbackMessages.accountAlreadyExists);
    } else {
      toast.error(feedbackMessages.registrationError);
    }

  };

  const onHandleRegisterUser = async (event: FormSubmitEvent) => {
    event.preventDefault();

    if (repeatPasswordInput !== passwordInput) {
      toast.error(feedbackMessages.passwordMismatch, {
        icon: <WarningIcon
          height="22px"
          width="22px" />
      });
    } else {
      try {
        setIsLoading(true);

        registerUser({
          requestBody: {
            name: nameInput,
            email: emailInput,
            password: passwordInput,
          },
          onSuccess: () => login(emailInput, passwordInput),
          onError: (error) => onError("Create new user error", error)
        });
      } catch (createNewUserError) {
        onError("Create new user error", createNewUserError);
      }
    }

    setIsLoading(false);
  };

  const onTogglePasswordVisibility = (key: string, value: boolean) => {
    const updatedPasswordShowingState = {
      ...isPasswordShowing,
      [key]: value,
    };

    setIsPasswordShowing(updatedPasswordShowingState);
  };

  return (
    <AuthCard
      cardClassname="registration-card"
      logoClassname="mt-3"
      title="Welcome!"
      subTitle="Create your Supanova account"
      buttonText="Sign up"
      isLoading={isLoading}
      footerText="Have an account?"
      footerLinkText="Login"
      footerLinkPath="/login"
      onSubmit={onHandleRegisterUser}>
      <FormInput
        formId="username"
        formGroupClassname={formGroupClassname}
        inputContainerClassname="text-input"
        label="First name"
        type="text"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)} />
      <FormInput
        formId="email"
        formGroupClassname={formGroupClassname}
        inputContainerClassname="text-input"
        label="Email"
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}/>
      <FormInput
        formId="password"
        formGroupClassname="mb-2"
        inputContainerClassname="d-flex align-items-center password-input"
        label="Password"
        type={isPasswordShowing.password ? "text" : "password"}
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        minLength={6}
        Component={(
          <PasswordVisibilityIcon
            isPasswordShowing={isPasswordShowing.password}
            onTogglePasswordVisibility={(value) => onTogglePasswordVisibility("password", value)} />
        )}/>
      <FormInput
        formId="repeat-password"
        formGroupClassname="mb-2"
        inputContainerClassname="d-flex align-items-center password-input"
        label="Repeat password"
        type={isPasswordShowing.repeatPassword ? "text" : "password"}
        value={repeatPasswordInput}
        onChange={(e) => setRepeatPasswordInput(e.target.value)}
        minLength={6}
        Component={(
          <PasswordVisibilityIcon
            isPasswordShowing={isPasswordShowing.repeatPassword}
            onTogglePasswordVisibility={(value) => onTogglePasswordVisibility("repeatPassword", value)} />
        )}/>
    </AuthCard>
  );
};

export default Register;
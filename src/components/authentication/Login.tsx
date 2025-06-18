import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  REACT_TOAST_DURATION,
  feedbackMessages,
} from "src/constants/constants";

import AuthCard from "./AuthCard";
import PasswordVisibilityIcon from "./PasswordVisibilityIcon";
import { useAuth } from "../../contexts/AuthContext";
import { FormSubmitEvent } from "../../types/index";
import FormInput from "../FormInput";

const Login = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState<boolean>(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const onHandleLogin = async (event: FormSubmitEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      await login(emailInput, passwordInput);
      navigate("/");
    } catch (error: any) {
      console.log(error);

      if (error.code === "auth/wrong-password.") {
        toast.error(
          feedbackMessages.loginValidationError,
          REACT_TOAST_DURATION,
        );
      } else {
        toast.error(feedbackMessages.loginError, REACT_TOAST_DURATION);
      }
    }

    setIsLoading(false);
  };

  return (
    <AuthCard
      cardClassname="auth-card"
      title="Welcome!"
      subTitle="Log in to your Supanova account"
      buttonText="Log in"
      isLoading={isLoading}
      onSubmit={onHandleLogin}
    >
      <FormInput
        formId="email"
        formGroupClassname="mb-2 auth-form-input"
        inputContainerClassname="text-input"
        label="Email"
        type="email"
        value={emailInput}
        onChange={e => setEmailInput(e.target.value)}
      />
      <FormInput
        formId="password"
        formGroupClassname="mb-2 auth-form-input"
        inputContainerClassname="d-flex align-items-center password-input"
        label="Password"
        type={isPasswordShowing ? "text" : "password"}
        value={passwordInput}
        onChange={e => setPasswordInput(e.target.value)}
        minLength={6}
        Component={
          <PasswordVisibilityIcon
            isPasswordShowing={isPasswordShowing}
            onTogglePasswordVisibility={value => setIsPasswordShowing(value)}
          />
        }
      />

      <div className="auth-link-container">
        <Link to="/forgot-password" className="auth-link">
          Forgot password?
        </Link>
      </div>
    </AuthCard>
  );
};

export default Login;

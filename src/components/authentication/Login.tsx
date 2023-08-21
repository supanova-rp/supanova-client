import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { FormSubmitEvent } from "../../types/index";

import FormInput from "../FormInput";
import PasswordVisibilityIcon from "./PasswordVisibilityIcon";
import AuthCard from "./AuthCard";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const onHandleLogin = async (event: FormSubmitEvent) => {
    event.preventDefault();

    try {
      setError("");
      setIsLoading(true);

      await login(emailInput, passwordInput);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Wrong email and/or password");
    }

    setIsLoading(false);
  };

  return (
    <AuthCard
      cardClassname="login-card"
      title="Hi again!"
      subTitle="Log in to your Supanova account"
      buttonText="Log in"
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkPath="/register"
      error={error}
      alertClassname="auth-alert"
      isLoading={isLoading}
      onSubmit={onHandleLogin}>
      <FormInput
        formId="email"
        formGroupClassname="mb-2 pe-4"
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
        type={isPasswordShowing ? "text" : "password"}
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        minLength={6}
        Component={(
          <PasswordVisibilityIcon
            isPasswordShowing={isPasswordShowing}
            onTogglePasswordVisibility={(value) => (setIsPasswordShowing(value))} />
        )}/>

      <div className="auth-link-container">
        <Link
          to="/forgot-password"
          className="auth-link">
          Forgot password?
        </Link>
      </div>
    </AuthCard>
  );
};

export default Login;

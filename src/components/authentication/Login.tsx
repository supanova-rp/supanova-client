import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

import { colors } from "src/constants/colorPalette";
import { useAuth } from "../../contexts/AuthContext";
import { FormSubmitEvent } from "../../types/index";

import FormInput from "../FormInput";
import PasswordVisibilityIcon from "./PasswordVisibilityIcon";
import AuthForm from "./AuthForm";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  const navigate = useNavigate();

  const { login, currentUser } = useAuth();

  useEffect(() => {
    // Make sure we only navigate to login when we have a currentUser
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const onHandleLogin = async (event: FormSubmitEvent) => {
    event.preventDefault();
    try {
      setValidationError("");
      setIsLoading(true);

      await login(emailInput, passwordInput);
    } catch (error) {
      console.log(error);
      setValidationError("Wrong email and/or password");
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center h-100 login-container">
        <PulseLoader color={colors.orange} />
      </div>
    );
  }

  return (
    <AuthForm
      title="Log in"
      emailInput={emailInput}
      cardClassname="login-card"
      buttonText="Log in"
      footerText="Forgot password?"
      footerPath="/forgot-password"
      isLoading={isLoading}
      validationError={validationError}
      onSubmit={onHandleLogin}
      setEmailInput={setEmailInput}
      AdditionalInputFields={(
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
              setIsPasswordShowing={setIsPasswordShowing} />
          )}/>
      )} />
  );

};

export default Login;

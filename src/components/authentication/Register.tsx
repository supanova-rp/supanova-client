import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "src/contexts/AuthContext";
import { FormSubmitEvent } from "src/types";

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
  const [error, setError] = useState("");

  const { signup, currentUser, updateUser } = useAuth();

  const navigate = useNavigate();

  const formGroupClassname = "mb-2 pe-4";

  useEffect(() => {
    // Make sure we only navigate to login when we have a currentUser
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const onHandleRegisterUser = async (event: FormSubmitEvent) => {
    event.preventDefault();
    setError("");

    if (repeatPasswordInput !== passwordInput) {
      setError("Please make sure your passwords match");
    } else {
      try {
        setIsLoading(true);

        const newUser = await signup(emailInput, passwordInput);

        await updateUser(newUser, nameInput);
      } catch (error) {
        console.log(error);
        setError("Failed to create an account. Try again");
      }
    }

    setIsLoading(false);
  };

  // const onHandleRegisterUser = async (event: FormSubmitEvent, email: string, name: string, userId: string) => {
  //   event.preventDefault();

  //   try {
  //     setIsLoading(true);

  //     const newUser = await signup(email, uuid());

  //     await updateUser(newUser, name);

  //     await updateProfile(newUser.user, { displayName: name });

  //     const usersAfterReg = updateUsers(users, userId, { registered: true, regError: false });

  //     try {
  //       await resetPassword(email);

  //       const usersAfterPasswordReset = updateUsers(usersAfterReg, userId, { hasPasswordResetError: false });

  //       setUsers(usersAfterPasswordReset);
  //     } catch (error) {
  //       console.log(">>> Error sending reset password email: ", error);

  //       const usersAfterFailedPasswordReset = updateUsers(users, userId, { hasPasswordResetError: true });

  //       setUsers(usersAfterFailedPasswordReset);
  //     }
  //   } catch (error) {
  //     console.log(">>> Error registering user: ", error);

  //     const usersAfterFailedReg = updateUsers(users, userId, { regError: true });

  //     setUsers(usersAfterFailedReg);
  //   }

  //   setIsLoading(false);
  // };

  const onHandlePasswordShowing = (key: string, value: boolean) => {
    const updatedPasswordShowingState = {
      ...isPasswordShowing,
      [key]: value,
    };

    setIsPasswordShowing(updatedPasswordShowingState);
  };

  return (
    <AuthCard
      cardClassname="registration-card"
      title="Welcome!"
      subTitle="Create your Supanova account"
      buttonText="Sign up"
      isLoading={isLoading}
      footerText="Have an account?"
      footerLinkText="Login"
      footerLinkPath="/login"
      error={error}
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
            onHandlePasswordShowing={(value) => onHandlePasswordShowing("password", value)} />
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
            onHandlePasswordShowing={(value) => onHandlePasswordShowing("repeatPassword", value)} />
        )}/>
    </AuthCard>
  );
};

export default Register;
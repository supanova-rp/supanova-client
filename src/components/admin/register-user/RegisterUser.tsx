import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import Card from "src/components/Card";
import { colors } from "src/constants/colorPalette";
import {
  REACT_TOAST_DURATION,
  feedbackMessages,
} from "src/constants/constants";
import useRequest from "src/hooks/useRequest";
import { FormSubmitEvent } from "src/types";
import { generateRandomString } from "src/utils/utils";

import FormInput from "../../FormInput";

const formGroupClassname = "mb-2";

type UserCreatedDetails = {
  name: string;
  email: string;
  password: string;
};

export const RegisterUser = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<UserCreatedDetails | null>(
    null,
  );

  const registerUser = useRequest("/register");

  const onError = (errorName: string, error: any) => {
    setIsLoading(false);
    console.log(`${errorName}: ${error}`);
    if (error === "auth/email-already-exists") {
      toast.error(
        feedbackMessages.accountAlreadyExistsRegisterUser,
        REACT_TOAST_DURATION,
      );
    } else {
      toast.error(feedbackMessages.registrationError, REACT_TOAST_DURATION);
    }
  };

  const onSuccess = (name: string, email: string, password: string) => {
    setUserCreated({ name, email, password });
    setNameInput("");
    setEmailInput("");
    setIsLoading(false);
  };

  const onHandleRegisterUser = async (event: FormSubmitEvent) => {
    event.preventDefault();

    const generatedPassword = generateRandomString();

    try {
      setIsLoading(true);

      registerUser({
        requestBody: {
          name: nameInput,
          email: emailInput,
          password: generatedPassword,
        },
        onSuccess: () => onSuccess(nameInput, emailInput, generatedPassword),
        onError: error => onError("Create new user error", error),
      });
    } catch (createNewUserError) {
      onError("Create new user error", createNewUserError);
    }
  };

  return (
    <div>
      {userCreated ? (
        <Card className="mb-3 content-card-compact card-info">
          <div>
            <h5>User successfully registered:</h5>
            <div>Name: {userCreated.name}</div>
            <div>Email: {userCreated.email}</div>
            <div>Password: {userCreated.password}</div>
          </div>

          <Button
            className="btn btn-primary mt-4"
            onClick={() => setUserCreated(null)}
          >
            Done
          </Button>
        </Card>
      ) : null}

      <Form onSubmit={onHandleRegisterUser} className="register-user-form">
        <FormInput
          formId="username"
          formGroupClassname={formGroupClassname}
          inputContainerClassname="text-input"
          label="Full name"
          type="text"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
        <FormInput
          formId="email"
          formGroupClassname={formGroupClassname}
          inputContainerClassname="text-input"
          label="Email"
          type="email"
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
        />
        <Button
          disabled={isLoading}
          type="submit"
          className="mt-4 btn btn-primary"
        >
          {isLoading ? (
            <PulseLoader color={colors.white} size={8} />
          ) : (
            "Register User"
          )}
        </Button>
      </Form>
    </div>
  );
};

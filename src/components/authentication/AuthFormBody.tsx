import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";

import SupanovaLogo from "../../images/Supanova-logo.png";

import { FormSubmitEvent } from "src/types";

import FormInput from "../FormInput";

interface Props {
  isLoading: boolean,
  title: string,
  emailInput: string,
  successMessage?: string,
  cardClassname: string,
  alertClassname?: string,
  validationError: string,
  buttonText: string,
  footerText: string,
  footerPath: string,
  onSubmit: (event: FormSubmitEvent) => Promise<void>,
  AdditionalInputFields?: React.ReactNode,
  setEmailInput: Dispatch<SetStateAction<string>>
}

const AuthFormBody: React.FC<Props> = ({
  isLoading,
  title,
  emailInput,
  cardClassname,
  alertClassname,
  successMessage,
  validationError,
  buttonText,
  footerText,
  footerPath,
  onSubmit,
  AdditionalInputFields,
  setEmailInput,
}) => {
  return (
    <>
      <img
        src={SupanovaLogo}
        alt="Supanova Logo"
        className="mb-4 login-logo" />

      <div>
        <Card className={`pt-4 ${cardClassname}`}>
          <Card.Body>
            <h2 className="text-center mb-3 ">{title}</h2>
            {validationError
              ? (
                <Alert
                  variant="danger"
                  className={alertClassname}>
                  {validationError}
                </Alert>
              )
              : null
            }

            {successMessage
              ? (
                <Alert
                  variant="success"
                  className="forgot-password-alert">
                  {successMessage}
                </Alert>
              )
              : null
            }

            <Form onSubmit={onSubmit}>
              <FormInput
                formId="email"
                formGroupClassname="mb-2 pe-4"
                inputContainerClassname="email-input"
                label="Email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}/>

              {AdditionalInputFields}

              <Button
                disabled={isLoading}
                type="submit"
                className="mt-4 login-button main-button">
                {buttonText}
              </Button>
            </Form>

            <footer className="w-100 text-center mt-4 mb-2 footer-link clickable">
              <Link to={footerPath}>
                {footerText}
              </Link>
            </footer>

          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AuthFormBody;
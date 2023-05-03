import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import { FormSubmitEvent } from "../../types/index";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [validationError, setValidationError] = useState("");
  const [resetPasswordSuccessMessage, setResetPasswordSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  // TODO: change the sender e-mail for reset password

  const handleSuccessMessageAfterResettingPassword = () => {
    setTimeout(() => {
      setResetPasswordSuccessMessage("");
    }, 3000);
  };

  const onHandleResetPassword = async (event: FormSubmitEvent) => {
    event.preventDefault();

    try {
      setValidationError("");
      setIsLoading(true);

      await resetPassword(emailInput);
      setResetPasswordSuccessMessage("Check your inbox for further instructions.");

      handleSuccessMessageAfterResettingPassword();
    } catch (error) {
      console.log(error);
      setResetPasswordSuccessMessage("");
      setValidationError("Failed to reset password.");
    }

    setIsLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center login-container">
      <div>
        <Card className="pt-4 forgot-password-card">
          <Card.Body>
            <h2 className="text-center mb-3">Password Reset</h2>
            {validationError
              ? (
                <Alert
                  variant="danger"
                  className="forgot-password-alert">{validationError}
                </Alert>
              )
              : null
            }
            {resetPasswordSuccessMessage
              ? (
                <Alert
                  variant="success"
                  className="forgot-password-alert">{resetPasswordSuccessMessage}
                </Alert>
              )
              : null
            }
            <Form onSubmit={onHandleResetPassword}>
              <Form.Group
                id="email"
                className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)} />
              </Form.Group>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-100 mt-4 main-button">
                Reset Password
              </Button>
            </Form>
            <footer className="w-100 text-center mt-4 footer-link clickable "><Link to="/login">Log in</Link></footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;

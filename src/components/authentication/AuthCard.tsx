import { Alert, Button, Card, Form } from "react-bootstrap";

import SupanovaLogo from "../../images/Supanova-logo.png";
import { FormSubmitEvent } from "src/types";
import AuthFooter from "./AuthFooter";

type AuthCardProps = React.PropsWithChildren & {
  cardClassname: string,
  title: string,
  subTitle: string,
  buttonText: string,
  footerText: string,
  footerLinkText: string,
  footerLinkPath: string,
  error: string,
  isLoading: boolean,
  onSubmit: (event: FormSubmitEvent) => Promise<void>
  successMessage?: string,
  alertClassname?: string,
}

const AuthCard: React.FC<AuthCardProps>=
({
  children,
  cardClassname,
  title,
  subTitle,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkPath,
  error,
  isLoading,
  onSubmit,
  successMessage = "",
  alertClassname = "",
}) => {
  return (
    <div className="auth-container">
      <img
        src={SupanovaLogo}
        alt="Supanova Logo"
        className="auth-logo" />

      <Card className={`auth-card ${cardClassname}`}>
        <Card.Body className="auth-card-body">
          <div className="d-flex flex-column align-items-center">
            <h2 className="text-center mb-2 ">{title}</h2>
            <p className="auth-paragraph">{subTitle}</p>
          </div>
          {error
            ? (
              <Alert
                variant="danger"
                className={alertClassname}>
                {error}
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

          <Form
            onSubmit={onSubmit}
            className="has-success">
            {children}
            <Button
              disabled={isLoading}
              type="submit"
              className="main-button auth-button">
              {isLoading
                ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"></span>
                    Loading...
                  </>
                )
                : buttonText
              }
            </Button>

            <AuthFooter
              footerText={footerText}
              footerLinkPath={footerLinkPath}
              footerLinkText={footerLinkText} />
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AuthCard;
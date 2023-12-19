import { Button, Card, Form } from "react-bootstrap";

import SupanovaLogo from "../../images/Supanova-logo.png";
import { FormSubmitEvent } from "src/types";
import AuthFooter from "./AuthFooter";

type AuthCardProps = React.PropsWithChildren & {
  cardClassname: string,
  logoClassname?: string,
  buttonClassName?: string,
  title: string,
  subTitle: string,
  buttonText: string,
  footerText: string,
  footerLinkText: string,
  footerLinkPath: string,
  isLoading: boolean,
  onSubmit: (event: FormSubmitEvent) => Promise<void>
}

const AuthCard: React.FC<AuthCardProps>=
({
  children,
  cardClassname,
  buttonClassName,
  logoClassname,
  title,
  subTitle,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkPath,
  isLoading,
  onSubmit,
}) => {
  const forgotPasswordButtonClassname = buttonClassName ? buttonClassName : "auth-button";

  return (
    <div className="auth-container">
      <img
        src={SupanovaLogo}
        alt="Supanova Logo"
        className={`auth-logo ${logoClassname}`} />

      <Card className={`auth-card ${cardClassname}`}>
        <Card.Body className="auth-card-body">
          <div className="d-flex flex-column align-items-center">
            <h2 className="text-center mb-2">{title}</h2>
            <p className="auth-paragraph">{subTitle}</p>
          </div>
          <Form
            onSubmit={onSubmit}
            className="has-success">
            {children}
            <Button
              disabled={isLoading}
              type="submit"
              className={`main-button ${forgotPasswordButtonClassname}`}>
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
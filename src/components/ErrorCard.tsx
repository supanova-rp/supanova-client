import { Button } from "react-bootstrap";

import ErrorIcon from "../assets/icons/errorIcon.svg?react";

interface Props {
  errorMessage: string;
  size?: "medium" | "large";
  onClick: () => void;
}

const ErrorCard: React.FC<Props> = ({
  errorMessage,
  size = "medium",
  onClick,
}) => {
  const feedbackCardContentClassname =
    size === "medium"
      ? "feedback-card-content-medium"
      : "feedback-card-content-large";

  return (
    <div className="feedback-card-container">
      <div className={feedbackCardContentClassname}>
        <ErrorIcon className="feedback-icon" />
        <h3 className="error-title">Error</h3>
        <p className="feedback-description">Something went wrong...</p>
        <p className="feedback-description">{errorMessage}</p>
        <Button onClick={onClick} className="error-button">
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorCard;

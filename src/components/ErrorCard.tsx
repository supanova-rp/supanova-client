import { Button } from "react-bootstrap";

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
        <h3 className="error-title">Oops</h3>
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

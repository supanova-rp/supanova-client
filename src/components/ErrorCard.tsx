import { Button } from "react-bootstrap";

interface Props {
  errorMessage: string;
  size?: "medium" | "large" | "full";
  onClick: () => void;
}

const classNameMap = {
  medium: "feedback-card-content-medium",
  large: "feedback-card-content-large",
  full: "feedback-card-content-full",
};

const ErrorCard: React.FC<Props> = ({
  errorMessage,
  size = "medium",
  onClick,
}) => {
  return (
    <div className="feedback-card-container">
      <div className={classNameMap[size]}>
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

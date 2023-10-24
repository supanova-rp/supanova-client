import { Button } from "react-bootstrap";
import { ReactComponent as ErrorIcon } from "../icons/errorIcon.svg";

interface Props {
  errorMessage: string,
  clickHandlerFunction: () => void,
}

const ErrorCard: React.FC<Props> = ({ errorMessage, clickHandlerFunction }) => {
  return (
    <div className="feedback-card-container">
      <div className="feedback-card-content">
        <ErrorIcon className="feedback-icon" />
        <h3 className="error-title">Error</h3>
        <p className="feedback-description">Something went wrong...</p>
        <p className="feedback-description">{errorMessage}</p>
        <Button
          onClick={clickHandlerFunction}
          className="error-button">Try again</Button>
      </div>
    </div>
  );
};

export default ErrorCard;
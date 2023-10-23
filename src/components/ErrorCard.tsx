import { Button } from "react-bootstrap";
import { ReactComponent as ErrorIcon } from "../icons/errorIcon.svg";

interface Props {
  errorMessage: string,
  clickHandlerFunction: () => void,
}

const ErrorCard: React.FC<Props> = ({ errorMessage, clickHandlerFunction }) => {
  return (
    <div className="error-card-container">
      <div className="error-card-content">
        <ErrorIcon className="error-icon" />
        <h3 className="error-title">Error</h3>
        <p className="error-description">Something went wrong...</p>
        <p className="error-description">{errorMessage}</p>
        <Button
          onClick={clickHandlerFunction}
          className="error-button">Try again</Button>
      </div>
    </div>

  );
};

export default ErrorCard;
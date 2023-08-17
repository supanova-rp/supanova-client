import { Alert, Button } from "react-bootstrap";

interface Props {
  errorMessage: string,
  onClick: (isAdmin: boolean) => void,
}

const Error: React.FC<Props> = ({ errorMessage, onClick }) => {
  return (
    <div className="mt-4">
      <Alert variant="danger">{errorMessage}</Alert>
      <Button
        className="main-button"
        onClick={onClick}>
        Try again
      </Button>
    </div>
  );
};

export default Error;
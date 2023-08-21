import { Form, Spinner } from "react-bootstrap";

interface ToggleButtonProps {
  label: string,
  isChecked: boolean,
  isLoading: boolean,
  onChange: () => void,
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isChecked,
  isLoading,
  onChange
}) => {
  return (
    <div className="d-flex align-items-center">
      <Form.Check
        className="toggle-button"
        type="switch"
        id="toggle-switch"
        label={label}
        checked={isChecked}
        onChange={onChange}/>
      {isLoading
        ? (
          <Spinner
            animation="border"
            role="status"
            variant="secondary"
            size="sm">
            <span className="visually-hidden">Loading...</span>

          </Spinner>
        )
        : null
      }
    </div>
  );
};

export default ToggleButton;
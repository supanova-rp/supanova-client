import { Toast } from "react-bootstrap";

import { ReactComponent as TickIcon } from "../icons/tickIcon.svg";
import { ReactComponent as CloseIcon } from "../icons/closeIcon.svg";

interface CustomToastProps {
  toastMessage: string,
  className: string,
}

const CustomToast: React.FC<CustomToastProps> = ({ toastMessage, className } ) => {
  return (
    <Toast
      className={`position-fixed end-0 top-0 ${className}`}
      delay={1000000}>
      <Toast.Body className="custom-toast-body">
        <div>
          <TickIcon
            stroke="white"
            className="pe-1" />
          {toastMessage}
        </div>
        <CloseIcon
          stroke="white"
          fill="white"
          height="20px" />
      </Toast.Body>
    </Toast>
  );
};

export default CustomToast;
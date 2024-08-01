import { Button } from "react-bootstrap";

import XMarkIcon from "../../assets/icons/xMarkIcon.svg?react";
import { colors } from "../../constants/colorPalette";

interface Props extends React.PropsWithChildren {
  confirmText?: string;
  onClose?: () => void;
  onClickConfirm?: () => void;
}

const Modal: React.FC<Props> = ({
  children,
  confirmText = "Confirm",
  onClose,
  onClickConfirm,
}) => {
  return (
    <div className="full-screen-modal-container min-vh-100">
      <div className="custom-modal min-vh-100" />
      <div className="modal-content">
        {onClose ? (
          <div className="x-mark-modal-container">
            <XMarkIcon
              onClick={onClose}
              stroke={colors.darkgrey}
              role="button"
            />
          </div>
        ) : null}

        <div className="d-flex justify-content-center modal-text-container">
          {children}
        </div>

        {onClickConfirm ? (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Button onClick={onClickConfirm} className="btn btn-primary">
              {confirmText}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;

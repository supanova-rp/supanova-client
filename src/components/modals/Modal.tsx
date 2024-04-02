import { Button } from "react-bootstrap";
import { colors } from "../../constants/colorPalette";
import { ReactComponent as XMarkIcon } from "../../icons/xMarkIcon.svg";

interface Props extends React.PropsWithChildren {
  confirmText?: string,
  onClose?: () => void,
  onClickConfirm?: () => void,
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
        {onClose
          ? (
            <div className="x-mark-modal-container">
              <XMarkIcon
                onClick={onClose}
                stroke={colors.darkgrey}
                role="button" />
            </div>
          )
          : null
        }

        <div className="d-flex justify-content-center modal-text-container">
          {children}
        </div>

        {onClickConfirm
          ? (
            <Button
              onClick={onClickConfirm}
              type="button"
              className="me-4 main-button">
              {confirmText}
            </Button>
          )
          : null
        }

      </div>
    </div>
  );
};

export default Modal;

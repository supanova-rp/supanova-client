import { colors } from "../../constants/colorPalette";
import { ReactComponent as XMarkIcon } from "../../icons/xMarkIcon.svg";

interface Props extends React.PropsWithChildren {
  onClick: (parameter: number | null) => void,
}

const Modal: React.FC<Props> = ({ onClick, children }) => {
  return (
    <div className="full-screen-modal-container min-vh-100">
      <div className="modal min-vh-100" />
      <div className="modal-content">
        <div className="x-mark-modal-container">
          <XMarkIcon
            onClick={() => onClick(null)}
            stroke={colors.darkgray}
            className="clickable" />
        </div>
        <div className="d-flex justify-content-center modal-text-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

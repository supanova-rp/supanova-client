import { colors } from "../../constants/colorPalette";
import { ReactComponent as XMarkIcon} from "../../icons/xMarkIcon.svg";

interface Props extends React.PropsWithChildren {
  onClick: (parameter: number | null) => void,
}

const Overlay: React.FC<Props> = ({ onClick, children }) => {
  return (
    <div className="full-screen-overlay-container min-vh-100">
      <div className="overlay min-vh-100" />
      <div className="overlay-content">
        <div className="x-mark-overlay-container">
          <XMarkIcon onClick={() => onClick(null)} stroke={colors.darkgray} className="clickable" />
        </div>
        <div className="d-flex justify-content-center overlay-text-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Overlay;

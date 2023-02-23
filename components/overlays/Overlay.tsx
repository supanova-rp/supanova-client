import { colors } from '@/constants/colorPalette';
import XMarkIcon from '@/icons/xMarkIcon.svg';

interface Props {
  onClick: (parameter: number | null) => void,
  children: React.ReactNode,
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

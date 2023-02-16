import { colors } from '@/constants/colorPalette';
import XMarkIcon from '@/icons/xMarkIcon.svg';

interface Props {
  onClick: (parameter: boolean) => void,
  children: React.ReactNode,
}

const Overlay: React.FC<Props> = ({ onClick, children }) => {
  return (
    <div className="full-screen-overlay-container">
      <div className="overlay" />
      <div className="overlay-content">
        <div className="x-mark-overlay-container">
          <XMarkIcon onClick={() => onClick(false)} stroke={colors.darkgray} className="clickable" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Overlay;

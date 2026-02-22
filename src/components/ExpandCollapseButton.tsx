import ChevronRight from "src/assets/icons/chevronRight.svg?react";
import { colors } from "src/constants/colorPalette";

type Props = {
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};

const ExpandCollapseButton = ({
  isExpanded,
  onClick,
  className,
  children,
}: Props) => (
  <button
    type="button"
    className={`expand-collapse-button ${className ?? ""}`}
    onClick={onClick}
  >
    <ChevronRight
      stroke={colors.orange}
      width={18}
      className={`expand-collapse-icon ${isExpanded ? "expanded" : ""}`}
    />
    {children}
  </button>
);

export default ExpandCollapseButton;

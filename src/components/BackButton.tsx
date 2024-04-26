import React from "react";

import { ReactComponent as ChevronLeft } from "../icons/chevronLeft.svg";
import { colors } from "src/constants/colorPalette";

interface Props {
  onClickBack: () => void,
}

const BackButton: React.FC<Props> = ({ onClickBack }) => {
  return (
    <div role="button">
      <ChevronLeft
        stroke={colors.orange}
        className="mt-4 me-1"
        onClick={onClickBack} />
    </div>
  );
};

export default BackButton;

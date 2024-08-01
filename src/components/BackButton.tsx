import React from "react";
import { colors } from "src/constants/colorPalette";

import ChevronLeft from "../assets/icons/chevronLeft.svg?react";

interface Props {
  onClickBack: () => void;
}

const BackButton: React.FC<Props> = ({ onClickBack }) => {
  return (
    <div role="button">
      <ChevronLeft
        stroke={colors.orange}
        className="me-1"
        onClick={onClickBack}
      />
    </div>
  );
};

export default BackButton;

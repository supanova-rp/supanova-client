import React from "react";

import XCircleErrorIcon from "../assets/icons/xCircleIcon.svg?react";
import { colors } from "../constants/colorPalette";

interface Props {
  text: string;
}

const XIcon: React.FC<Props> = ({ text }) => {
  return (
    <div className="ms-3 d-flex align-items-center">
      <XCircleErrorIcon stroke={colors.red} />
      <p className="text-danger ms-2 mb-0">{text}</p>
    </div>
  );
};

export default XIcon;

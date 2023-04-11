import React from "react";

import { colors } from "../constants/colorPalette";
import { ReactComponent as XCircleErrorIcon } from "../icons/xCircleIcon.svg";

interface Props {
  text: string,
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

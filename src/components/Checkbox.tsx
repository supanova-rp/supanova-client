import React from "react";
import { colors } from "src/constants/colorPalette";

import Checked from "../assets/icons/checked.svg?react";
import Unchecked from "../assets/icons/unchecked.svg?react";

interface Props {
  checked: boolean;
}

const Checkbox: React.FC<Props> = ({ checked }) => {
  const Icon = checked ? Checked : Unchecked;
  const fill = checked ? colors.blue : colors.lightgrey;

  return (
    <div className="checkbox">
      <Icon width="16" height="16" fill={fill} />
    </div>
  );
};

export default Checkbox;

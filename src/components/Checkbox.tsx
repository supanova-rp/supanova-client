import React from "react";

import { ReactComponent as Checked } from "../icons/checked.svg";
import { ReactComponent as Unchecked } from "../icons/unchecked.svg";
import { colors } from "src/constants/colorPalette";

interface Props {
  checked: boolean,
}

const Checkbox: React.FC<Props> = ({ checked }) => {
  const Icon = checked ? Checked : Unchecked;
  const fill = checked ? colors.blue : colors.lightgrey;

  return (
    <div className="checkbox">
      <Icon
        width="16"
        height="16"
        fill={fill} />
    </div>
  );
};

export default Checkbox;

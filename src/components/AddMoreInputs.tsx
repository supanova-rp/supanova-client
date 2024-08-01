import React from "react";

import PlusIcon from "../assets/icons/plusIcon.svg?react";
import { colors } from "../constants/colorPalette";

interface Props {
  onClick: () => void;
  title: string;
  marginTop?: string;
  marginBottom?: string;
}

const AddMoreInputs: React.FC<Props> = ({
  onClick,
  title,
  marginTop = "",
  marginBottom = "mb-4",
}) => {
  return (
    <div className={`${marginBottom} ${marginTop} add-more-inputs-container`}>
      <p className="m-0">
        <strong>{title}</strong>
      </p>
      <div
        role="button"
        className="d-flex align-items-center p-1 plus-icon"
        onClick={onClick}
      >
        <PlusIcon stroke={colors.green} />
      </div>
    </div>
  );
};

export default AddMoreInputs;

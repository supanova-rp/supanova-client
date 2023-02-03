import React from "react";

import PlusIcon from '@/icons/plusIcon.svg';

import { colors } from "@/constants/colorPalette";

interface Props {
  onClick: () => void,
  title: string,
}

const AddMoreInputs: React.FC<Props> = ({ onClick, title }) => {
  return (
    <div className="mb-4 d-flex align-items-center">
      <p className="m-0"><strong>{title}</strong></p>
      <div className="d-flex align-items-center ms-1 p-2 icon" onClick={onClick}>
        <PlusIcon stroke={colors.green} />
      </div>
    </div>
    );
}
 
export default AddMoreInputs;
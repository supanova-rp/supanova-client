import React from 'react';

import PlusIcon from '@/icons/plusIcon.svg';

import { colors } from '@/constants/colorPalette';

interface Props {
  onClick: () => void,
  title: string,
  marginTop?: string,
}

const AddMoreInputs: React.FC<Props> = ({ onClick, title, marginTop }) => {
  return (
    <div className={`${marginTop} d-flex align-items-center add-more-inputs-container`}>
      <p className="m-0"><strong>{title}</strong></p>
      <div className="d-flex align-items-center ms-1 p-2 icon" onClick={onClick}>
        <PlusIcon stroke={colors.green} />
      </div>
    </div>
  );
};

export default AddMoreInputs;

import { colors } from '@/constants/colorPalette';

import XMarkIcon from '@/icons/xIcon.svg';
import React from 'react';

interface Props {
  text: string,
}

const XIcon: React.FC<Props> = ({ text }) => {
  return (
    <div className="ms-3 d-flex align-items-center">
      <XMarkIcon stroke={colors.red} />
      <p className="text-danger ms-2 mb-0">{text}</p>
    </div>

  );
};

export default XIcon;

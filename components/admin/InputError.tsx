import { colors } from '@/constants/colorPalette';

import XIcon from '@/icons/xIcon.svg';
import React from 'react';

interface Props {
  text: string,
}

const InputError: React.FC<Props> = ({ text }) => {
  return (
    <div className="ms-3 d-flex align-items-center">
      <XIcon stroke={colors.red} />
      <p className="text-danger ms-2 mb-0">{text}</p>
    </div>

  );
};

export default InputError;

import { colors } from '@/constants/colorPalette';
import MinusIcon from '@/icons/minusIcon.svg';

interface Props {
  onClickFunction: React.MouseEventHandler<HTMLDivElement>
}

const RemoveUserInput: React.FC<Props> = ({ onClickFunction }) => {
  return (
    <div className="ms-2 p-2 icon" onClick={onClickFunction}>
      <MinusIcon stroke={colors.red} />
    </div>
  );
};

export default RemoveUserInput;

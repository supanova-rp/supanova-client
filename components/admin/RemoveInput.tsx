import { colors } from '@/constants/colorPalette';
import MinusIcon from '@/icons/minusIcon.svg';

interface Props {
  onClickFunction: React.MouseEventHandler<HTMLDivElement>,
  margin?: string,
}

const RemoveInput: React.FC<Props> = ({ onClickFunction, margin }) => {
  return (
    <div className={`${margin} mb-3 p-2 icon`} onClick={onClickFunction}>
      <MinusIcon stroke={colors.red} />
    </div>
  );
};

export default RemoveInput;

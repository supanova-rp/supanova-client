import { colors } from '@/constants/colorPalette';
import MinusIcon from '@/icons/minusIcon.svg';

interface Props {
  onClickFunction: React.MouseEventHandler<HTMLDivElement>,
  marginStart?: string,
}

const RemoveInput: React.FC<Props> = ({ onClickFunction, marginStart }) => {
  return (
    <div className={`${marginStart} mb-3 p-2 icon`} onClick={onClickFunction}>
      <MinusIcon stroke={colors.red} />
    </div>
  );
};

export default RemoveInput;

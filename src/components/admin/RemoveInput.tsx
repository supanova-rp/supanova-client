import { ReactComponent as MinusIcon } from "../../icons/minusIcon.svg";
import { colors } from "../../constants/colorPalette";

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

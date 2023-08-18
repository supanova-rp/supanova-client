import { ReactComponent as MinusIcon } from "../icons/minusIcon.svg";
import { colors } from "../constants/colorPalette";

interface Props {
  onClickFunction: React.MouseEventHandler<HTMLDivElement>,
  margin?: string,
}

const  RemoveInput: React.FC<Props> = ({ onClickFunction, margin }) => {
  return (
    <div
      role="button"
      className={`${margin} mb-3 p-2`}
      onClick={onClickFunction}>
      <MinusIcon
        stroke={colors.red}
        className="remove-icon" />
    </div>
  );
};

export default RemoveInput;

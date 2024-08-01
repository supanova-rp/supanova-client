import MinusIcon from "../assets/icons/minusIcon.svg?react";
import { colors } from "../constants/colorPalette";

interface Props {
  onClickFunction: React.MouseEventHandler<HTMLDivElement>;
  margin?: string;
  padding?: string;
}

const RemoveInput: React.FC<Props> = ({
  onClickFunction,
  margin,
  padding = "p-2",
}) => {
  return (
    <div
      role="button"
      className={`${margin} ${padding}`}
      onClick={onClickFunction}
    >
      <MinusIcon stroke={colors.red} className="remove-icon" />
    </div>
  );
};

export default RemoveInput;

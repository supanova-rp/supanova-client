import { colors } from "src/constants/colorPalette";
import { ReactComponent as HidePasswordIcon } from "../../icons/hidePasswordIcon.svg";
import { ReactComponent as ShowPasswordIcon } from "../../icons/showPasswordIcon.svg";

interface Props {
  isPasswordShowing: boolean,
  onHandlePasswordShowing: (parameter: boolean) => void,
}

const PasswordVisibilityIcon: React.FC<Props> = ({ isPasswordShowing, onHandlePasswordShowing }) => {
  if (!isPasswordShowing) {
    return (
      <div
        role="button"
        className="password-icon"
        onClick={() => onHandlePasswordShowing(true)}>
        <ShowPasswordIcon color={colors.darkgray}/>
      </div>
    );
  }

  return (
    <div
      role="button"
      className="password-icon"
      onClick={() => onHandlePasswordShowing(false)}>
      <HidePasswordIcon color={colors.darkgray} />
    </div>
  );
};

export default PasswordVisibilityIcon;
import { colors } from "src/constants/colorPalette";
import { ReactComponent as HidePasswordIcon } from "../../icons/hidePasswordIcon.svg";
import { ReactComponent as ShowPasswordIcon } from "../../icons/showPasswordIcon.svg";

interface Props {
  isPasswordShowing: boolean,
  onTogglePasswordVisibility: (parameter: boolean) => void,
}

const PasswordVisibilityIcon: React.FC<Props> = ({ isPasswordShowing, onTogglePasswordVisibility }) => {
  if (!isPasswordShowing) {
    return (
      <div
        role="button"
        className="password-icon show-password"
        onClick={() => onTogglePasswordVisibility(true)}>
        <ShowPasswordIcon color={colors.darkgray}/>
      </div>
    );
  }

  return (
    <div
      role="button"
      className="password-icon hide-password"
      onClick={() => onTogglePasswordVisibility(false)}>
      <HidePasswordIcon color={colors.darkgray} />
    </div>
  );
};

export default PasswordVisibilityIcon;
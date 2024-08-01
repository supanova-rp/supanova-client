import { colors } from "src/constants/colorPalette";

import HidePasswordIcon from "../../assets/icons/hidePasswordIcon.svg?react";
import ShowPasswordIcon from "../../assets/icons/showPasswordIcon.svg?react";

interface Props {
  isPasswordShowing: boolean;
  onTogglePasswordVisibility: (value: boolean) => void;
}

const PasswordVisibilityIcon: React.FC<Props> = ({
  isPasswordShowing,
  onTogglePasswordVisibility,
}) => {
  if (!isPasswordShowing) {
    return (
      <div
        role="button"
        className="password-icon show-password"
        onClick={() => onTogglePasswordVisibility(true)}
      >
        <ShowPasswordIcon color={colors.darkgrey} />
      </div>
    );
  }

  return (
    <div
      role="button"
      className="password-icon hide-password"
      onClick={() => onTogglePasswordVisibility(false)}
    >
      <HidePasswordIcon color={colors.darkgrey} />
    </div>
  );
};

export default PasswordVisibilityIcon;

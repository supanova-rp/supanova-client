import { ReactComponent as HidePasswordIcon } from "../../icons/hidePasswordIcon.svg";
import { ReactComponent as ShowPasswordIcon } from "../../icons/showPasswordIcon.svg";

interface Props {
  isPasswordShowing: boolean,
  setIsPasswordShowing: (parameter: boolean) => void,
}

const PasswordVisibilityIcon: React.FC<Props> = ({ isPasswordShowing, setIsPasswordShowing }) => {
  if (!isPasswordShowing) {
    return (
      <div
        className="ps-3 icon"
        onClick={() => setIsPasswordShowing(true)}>
        <ShowPasswordIcon />
      </div>
    );
  }

  return (
    <div
      className="ps-3 icon"
      onClick={() => setIsPasswordShowing(false)}>
      <HidePasswordIcon />
    </div>
  );
};

export default PasswordVisibilityIcon;
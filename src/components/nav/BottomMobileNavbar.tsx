import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bottomMobileNavbarIcons } from "src/constants/constants";
import { MobileNavbarIcon, setActiveTabFunction } from "src/types";

interface BottomMobileNavbarProps {
  setActiveTab: setActiveTabFunction;
}

const BottomMobileNavbar: React.FC<BottomMobileNavbarProps> = ({
  setActiveTab,
}) => {
  const [activeIconId, setActiveIconId] = useState<number>(1);

  const navigate = useNavigate();

  const onClickNavbarIcon = (icon: MobileNavbarIcon) => {
    setActiveIconId(icon.id);

    if (icon.tabName) {
      setActiveTab(icon.tabName);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bottom-mobile-navbar-container">
      {bottomMobileNavbarIcons.map(icon => {
        const IconComponent = icon.icon;

        return (
          <div
            className="bottom-mobile-navbar-item-container"
            key={`${icon.icon}-${icon.id}`}
          >
            <div
              onClick={() => onClickNavbarIcon(icon)}
              className="bottom-mobile-navbar-icon-container"
            >
              <IconComponent className="bottom-mobile-navbar-icon" />
            </div>
            {activeIconId === icon.id ? (
              <hr className="active-icon-line" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default BottomMobileNavbar;

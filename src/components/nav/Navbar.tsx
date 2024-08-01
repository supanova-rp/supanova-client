import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Button, Navbar as BootstrapNavbar } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  CourseTabs,
  REACT_TOAST_DURATION,
  feedbackMessages,
} from "src/constants/constants";
import { useAppContext } from "src/contexts/AppContext";
import { useIsMobile } from "src/hooks/useIsMobile";

import SupanovaLogo from "../../assets/images/supanova-logo.png";
import { useAuth } from "../../contexts/AuthContext";

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin }) => {
  const isMobile = useIsMobile();
  const { logout } = useAuth();
  const { setActiveTab } = useAppContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navbarClassname = isMobile
    ? "navbar nav p-0 px-3"
    : "navbar nav px-4 py-0";

  const onClickHandleLogout = async () => {
    setMobileMenuOpen(false);

    try {
      await logout();
    } catch (e) {
      console.log(e);
      toast.error(feedbackMessages.logoutError, REACT_TOAST_DURATION);
    }
  };

  const onClickHomeTab = (tab: CourseTabs) => {
    setMobileMenuOpen(false);
    setActiveTab(tab);
    navigate("/");
  };

  const renderNavbarContent = () => {
    if (isMobile) {
      return (
        <div className="d-flex align-items-center home-navbar-links">
          <div className="mx-1">
            <Hamburger
              size={28}
              color="white"
              toggled={isMobileMenuOpen}
              toggle={setMobileMenuOpen}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="d-flex align-items-center home-navbar-links">
        {isAdmin ? (
          <Link to="/admin" className="link-light nav-link admin">
            Admin
          </Link>
        ) : null}
        <Button
          variant="link"
          className="link-light nav-link logout"
          onClick={onClickHandleLogout}
        >
          Log out
        </Button>
      </div>
    );
  };

  return (
    <BootstrapNavbar className="home-navbar">
      <nav className={navbarClassname}>
        <img className="navbar-brand" src={SupanovaLogo} alt="Logo" />
        {renderNavbarContent()}
      </nav>

      {isMobile && isMobileMenuOpen ? (
        <div className="navbar-dropdown-menu">
          {isAdmin ? (
            <Link
              to="/admin"
              className="dropdown-nav-link link-light nav-link admin"
            >
              Admin
            </Link>
          ) : null}

          <Button
            variant="link"
            className="dropdown-nav-link link-light nav-link logout"
            onClick={() => onClickHomeTab(CourseTabs.Courses)}
          >
            Courses
          </Button>

          <Button
            variant="link"
            className="dropdown-nav-link link-light nav-link logout"
            onClick={() => onClickHomeTab(CourseTabs.Instructor)}
          >
            Instructor
          </Button>

          <Button
            variant="link"
            className="dropdown-nav-link link-light nav-link logout"
            onClick={onClickHandleLogout}
          >
            Log out
          </Button>
        </div>
      ) : null}
    </BootstrapNavbar>
  );
};

export default Navbar;

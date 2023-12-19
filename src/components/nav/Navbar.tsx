import toast from "react-hot-toast";
import { Button, Navbar as BootstrapNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useIsMobile } from "src/hooks/useIsMobile";
import { REACT_TOAST_DURATION, feedbackMessages } from "src/constants/constants";
import SupanovaLogo from "../../images/Supanova-logo-nav.png";

interface NavbarProps {
  isAdmin: boolean,
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin }) => {
  const isMobile = useIsMobile();
  const { logout } = useAuth();

  const navbarClassname = isMobile ? "navbar nav p-0 px-3" : "navbar nav px-4 py-0";

  const onClickHandleLogout = async () => {
    try {
      await logout();

    } catch (e) {
      console.log(e);
      toast.error(feedbackMessages.logoutError, REACT_TOAST_DURATION);
    }
  };

  return (
    <BootstrapNavbar className="home-navbar">
      <nav className={navbarClassname}>
        <img
          className="navbar-brand"
          src={SupanovaLogo}
          alt="Logo" />
        <div className="d-flex align-items-center home-navbar-links">
          {isAdmin
            ? (
              <Link
                to="/admin"
                className="link-light nav-link admin">
                Admin
              </Link>
            )
            : null
          }
          <Link
            to="https://supanova-rp.setmore.com"
            target="_blank"
            className="link-light nav-link">
            Book
          </Link>
          <Button
            variant="link"
            className="link-light nav-link logout"
            onClick={onClickHandleLogout}>
            Log out
          </Button>
        </div>
      </nav>
    </BootstrapNavbar>
  );
};

export default Navbar;

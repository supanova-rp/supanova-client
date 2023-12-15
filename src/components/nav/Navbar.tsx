import { Button, Navbar as BootstrapNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import SupanovaLogo from "../../images/Supanova-logo-nav.png";
import toast from "react-hot-toast";
import { feedbackMessages } from "src/constants/constants";

interface NavbarProps {
  isAdmin: boolean,
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin }) => {
  const { logout } = useAuth();

  const onClickHandleLogout = async () => {
    try {
      await logout();

    } catch (e) {
      console.log(e);
      toast.error(feedbackMessages.logoutError);
    }
  };

  return (
    <BootstrapNavbar>
      <nav className="navbar nav px-4 py-0">
        <img
          className="navbar-brand"
          src={SupanovaLogo}
          alt="Logo" />
        <div className="d-flex align-items-center">
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

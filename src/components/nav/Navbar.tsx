import { Button, Navbar as BootstrapNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { SetStringFunction } from "../../types/index";

import SupanovaLogo from "../../images/Supanova-logo-nav.png";

interface Props {
  setLogoutError: SetStringFunction,
  isAdmin: boolean,
}

const Navbar: React.FC<Props> = ({ setLogoutError, isAdmin }) => {
  const { logout } = useAuth();

  const onClickHandleLogOut = async () => {
    try {
      await logout();
      setLogoutError("");

    } catch (e) {
      console.log(e);
      setLogoutError("Error logging out. Please try again.");
    }
  };

  return (
    <BootstrapNavbar>
      <nav className="navbar w-100 nav px-4 py-0">
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
            onClick={onClickHandleLogOut}>
            Log out
          </Button>
        </div>
      </nav>
    </BootstrapNavbar>
  );
};

export default Navbar;

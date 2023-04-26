import { Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { SetStringFunction } from "../../types/index";

import SupanovaLogo from "../../images/Supanova-logo.png";

interface Props {
  setLogoutError: SetStringFunction,
  isAdmin: boolean,
}

const NavbarHome: React.FC<Props> = ({ setLogoutError, isAdmin }) => {
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
    <Navbar>
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
                className="link-light nav-link">
                Admin
              </Link>
            )
            : null
          }
          <Link
            to="https://supanovadev.setmore.com/jamiegarner"
            target="_blank"
            className="link-light nav-link">
            Book
          </Link>
          <Button
            variant="link"
            className="link-light nav-link"
            onClick={onClickHandleLogOut}>
            Log out
          </Button>
        </div>
      </nav>
    </Navbar>
  );
};

export default NavbarHome;

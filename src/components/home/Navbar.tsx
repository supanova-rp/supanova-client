import { Button, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { SetStringFunction } from "../../types/index";

import SupanovaLogo from "../../images/Supanova-logo.png";

interface Props {
  setLogoutError: SetStringFunction,
}

const NavbarHome: React.FC<Props> = ({ setLogoutError }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onClickHandleLogOut = async () => {
    try {
      await logout();
      setLogoutError("");

      navigate("/login", { replace: true });
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
          <Link
            to="/admin"
            className="link-light nav-link">Admin</Link>
          <Link
            to="https://supanovadev.setmore.com/jamiegarner"
            target="_blank"
            className="link-light nav-link">Book</Link>
          <Button
            variant="link"
            className="link-light nav-link"
            onClick={onClickHandleLogOut}>Log out</Button>
        </div>
      </nav>
    </Navbar>
  );
};

export default NavbarHome;

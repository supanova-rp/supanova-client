import LogoutError from "./LogoutError"

interface Props {
  title: string,
  logoutError: string,
}

const Header: React.FC<Props> = ({ title, logoutError }) => {
  return (
    <div className="mt-3">
      <header className="d-flex flex-column">
        <LogoutError logoutError={logoutError} />
        <h3 className="text-center mt-4">{title}</h3>        
      </header>
    </div>
    );
}
 
export default Header;
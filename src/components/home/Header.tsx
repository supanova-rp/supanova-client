import { Divider } from "../Divider";

interface HeaderProps {
  title: string,
  margin?: string,
  padding?: string,
}

const Header: React.FC<HeaderProps> = ({ title, margin = "mt-4", padding = "p-4" }) => {
  return (
    <div className={`${margin} ${padding}`}>
      <header className="d-flex flex-column">
        <h3 className="main-header">{title}</h3>
      </header>
      {/* <div style={{ width: "100px" }}>
        <Divider />
      </div> */}
    </div>
  );
};

export default Header;

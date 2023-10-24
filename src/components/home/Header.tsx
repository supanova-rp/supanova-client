interface HeaderProps {
  title: string,
  margin?: string,
}

const Header: React.FC<HeaderProps> = ({ title, margin = "mt-4" }) => {
  return (
    <div className={`${margin} p-4`}>
      <header className="d-flex flex-column">
        <h3 className="my-1">{title}</h3>
      </header>
    </div>
  );
};

export default Header;

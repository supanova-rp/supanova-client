
interface HeaderProps {
  title: string,
  className?: string,
}

const Header: React.FC<HeaderProps> = ({ title, className = "" }) => {
  return (
    <div className={className}>
      <header className="d-flex flex-column">
        <h3 className="main-header">{title}</h3>
      </header>
    </div>
  );
};

export default Header;

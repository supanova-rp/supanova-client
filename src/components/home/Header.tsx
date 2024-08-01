import BackButton from "../BackButton";

interface HeaderProps {
  title: string;
  className?: string;
  headerClassname?: string;
  onClickBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  className = "",
  headerClassname = "",
  onClickBack,
}) => {
  const HeaderComponent = (
    <div className={className}>
      <header className="d-flex flex-column">
        <h3 className={`main-header ${headerClassname}`}>{title}</h3>
      </header>
    </div>
  );

  if (onClickBack) {
    return (
      <div className="d-flex align-items-center">
        <div className="header-back-button">
          <BackButton onClickBack={onClickBack} />
        </div>

        {HeaderComponent}
      </div>
    );
  }

  return HeaderComponent;
};

export default Header;

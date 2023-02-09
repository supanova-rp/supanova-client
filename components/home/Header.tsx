import { LogoutErrorProps } from '@/index';
import LogoutError from './LogoutError';

interface Props extends LogoutErrorProps {
  title: string,
}

const Header: React.FC<Props> = ({ title, logoutError }) => {
  return (
    <div className="mt-3">
      <header className="d-flex flex-column">
        <LogoutError logoutError={logoutError} />
        <h3 className="my-4">{title}</h3>
      </header>
    </div>
  );
};

export default Header;

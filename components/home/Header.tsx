import { LogoutErrorProps } from '@/index';
import LogoutError from './LogoutError';

interface Props extends LogoutErrorProps {
  title: string,
  margin?: string,
}

const Header: React.FC<Props> = ({ title, logoutError, margin = 'mt-4' }) => {
  return (
    <div className={margin}>
      <header className="d-flex flex-column">
        <LogoutError logoutError={logoutError} />
        <h3 className="my-4">{title}</h3>
      </header>
    </div>
  );
};

export default Header;

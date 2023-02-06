import Image from 'next/image';
import { Button, Navbar } from 'react-bootstrap';
import { useRouter } from 'next/router';

import SupanovaLogo from '@/images/Supanova-logo.jpeg'

import { useAuth } from '@/contexts/AuthContext';
import { SetStringFunction } from '@/index';

interface Props {
  setLogoutError: SetStringFunction,
}

const NavbarHome: React.FC<Props> = ({ setLogoutError }) => {
  const { logout } = useAuth()

  const router = useRouter();

  const onClickHandleLogOut = async () => {
    try {
      await logout();
      router.push('/login');
      setLogoutError('')
    } catch (e) {
      setLogoutError('Failed to log out');
    }
  };

  return (
    <Navbar>
      <nav className="navbar w-100 nav p-0">
        <div className="container">
          <Image className="navbar-brand" src={SupanovaLogo} alt="Logo" width="80" height="70" />
          <Button variant="link" className="link-light text-decoration-none nav-link" onClick={onClickHandleLogOut}>Log out</Button>
        </div>
      </nav>
    </Navbar>
    );
}
 
export default NavbarHome;
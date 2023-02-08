import Image from 'next/image';
import { Button, Navbar } from 'react-bootstrap';
import { useRouter } from 'next/router';

import SupanovaLogo from '@/images/Supanova-logo.jpeg'

import { useAuth } from '@/contexts/AuthContext';
import { SetStringFunction } from '@/index';
import Link from 'next/link';

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
      <nav className="navbar w-100 nav px-4 py-0">
        <Image className="navbar-brand" src={SupanovaLogo} alt="Logo" width="80" height="70" />
        <div className="d-flex align-items-center">
          <Link href="https://supanova.setmore.com/jamiegarner" target="_blank">Book</Link>
          <Button variant="link" className="link-light text-decoration-none nav-link ms-5" onClick={onClickHandleLogOut}>Log out</Button>
        </div>  
      </nav>
    </Navbar>
    );
}
 
export default NavbarHome;
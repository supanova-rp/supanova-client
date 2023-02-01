import { Alert, Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts/AuthContext';
import { usePrivateRoute } from '@/hooks/usePrivateRoute';

const Home = () => {
  const [logoutError, setLogoutError] = useState('');

  const { logout, currentUser } = useAuth();

  const router = useRouter();

  // TODO: change this with middleware?
  usePrivateRoute();

  const onClickHandleLogOut = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (e) {
      setLogoutError('Failed to log out');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Course Curriculum</h2>
          {logoutError
            ? <Alert variant="danger">{logoutError}</Alert>
            : null
          }
        </Card.Body>
      </Card>
      <Button variant="link" onClick={onClickHandleLogOut}>Log out</Button>
    </>
  );
};

export default Home;

import { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const router = useRouter();

  const onHandleLogin = async (event) => {
    event.preventDefault();
    try {
      setValidationError('');
      setIsLoading(true);

      await login(emailInput, passwordInput);

      router.push('/home');
    } catch (error) {
      console.log(error);
      setValidationError('Wrong email and/or password');
    }

    setIsLoading(false);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}>
      <div>
        <Card className="pt-4" style={{ width: '400px', minHeight: '420px' }}>
          <Card.Body>
            <h2 className="text-center mb-3">Log in</h2>
            {validationError
              ? <Alert variant="danger">{validationError}</Alert>
              : null
            }
            <Form onSubmit={onHandleLogin}>
              <Form.Group id="email" className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)} />
              </Form.Group>
              <Form.Group id="password" className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  minLength={8}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)} />
              </Form.Group>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-100 mt-4">
                Login
              </Button>
            </Form>
            <footer className="w-100 text-center mt-4"><Link href="/forgot-password">Forgot password?</Link></footer>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login;

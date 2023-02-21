import { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts/AuthContext';

import HidePasswordIcon from '@/icons/hidePasswordIcon.svg';
import ShowPasswordIcon from '@/icons/showPasswordIcon.svg';
import { FormSubmitEvent } from '@/index';

const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  const { login } = useAuth();

  const router = useRouter();

  const onHandleLogin = async (event: FormSubmitEvent) => {
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
      className="d-flex align-items-center justify-content-center min-vh-100">
      <div>
        <Card className="pt-4 login-card">
          <Card.Body>
            <h2 className="text-center mb-3 ">Log in</h2>
            {validationError
              ? <Alert variant="danger">{validationError}</Alert>
              : null
            }
            <Form onSubmit={onHandleLogin}>
              <Form.Group id="email" className="mb-2 pe-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={emailInput}
                  className="login-input"
                  onChange={(e) => setEmailInput(e.target.value)} />
              </Form.Group>
              <Form.Group id="password" className="mb-2">
                <Form.Label>Password</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type={isPasswordShowing ? 'text' : 'password'}
                    minLength={6}
                    required
                    className="logƒin-input"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)} />

                  {!isPasswordShowing
                    ? (
                      <div className="ps-2 icon" onClick={() => setIsPasswordShowing(true)}>
                        <ShowPasswordIcon />
                      </div>
                    )
                    : (
                      <div className="ps-2 icon" onClick={() => setIsPasswordShowing(false)}>
                        <HidePasswordIcon />
                      </div>
                    )
                  }

                </div>
              </Form.Group>
              <Button
                disabled={isLoading}
                type="submit"
                className="mt-4 login-button">
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

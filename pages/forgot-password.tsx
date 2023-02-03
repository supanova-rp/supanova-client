import Link from 'next/link';
import { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';

import { useAuth } from '@/contexts/AuthContext';

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const [resetPasswordSuccessMessage, setResetPasswordSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, resetPassword } = useAuth();

  // TODO: change the sender e-mail for reset password

  const onHandleResetPassword = async (event) => {
    event.preventDefault();

    try {
      setValidationError('');
      setIsLoading(true);

      await resetPassword(emailInput);
      setResetPasswordSuccessMessage('Check your inbox for further instructions');
    } catch (error) {
      console.log(error);
      setResetPasswordSuccessMessage('');
      setValidationError('Failed to reset password');
    }

    setIsLoading(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <div>
        <Card className="pt-4 forgot-password-card">
          <Card.Body>
            <h2 className="text-center mb-3">Password Reset</h2>
            {validationError
              ? <Alert variant="danger">{validationError}</Alert>
              : null
            }
            {resetPasswordSuccessMessage
              ? <Alert variant="success">{resetPasswordSuccessMessage}</Alert>
              : null
            }
            <Form onSubmit={onHandleResetPassword}>
              <Form.Group id="email" className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)} />
              </Form.Group>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-100 mt-4">
                Reset Password
              </Button>
            </Form>
            <footer className="w-100 text-center mt-4"><Link href="/login">Log in</Link></footer>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default ForgotPassword;

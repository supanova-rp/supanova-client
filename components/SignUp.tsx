import { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signUp, currentUser } = useAuth();

  const onHandleSubmit = async (event) => {
    event.preventDefault();

    if (passwordInput !== passwordConfirmationInput) {
      setValidationError('Passwords don\'t match');
    } else {
      try {
        setValidationError('');
        setIsLoading(true);

        const newUser = await signUp(emailInput, passwordInput);

        await updateProfile(newUser.user, { displayName: nameInput });
      } catch (error) {
        console.log(error);
        setValidationError('Failed to create an account');
      }

      setIsLoading(false);
    }
  };

  // const onClickSignUp = async () => {
  //   try {
  //     const newUser = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);

  //     await updateProfile(newUser.user, { displayName: nameInput });

  //     console.log(auth?.currentUser?.email);
  //   } catch (error) {
  //     const errorMessage = error.message || error;

  //     console.log(errorMessage);
  //   }
  // };

  console.log('>>> user: ', currentUser);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}>
      <div>
        <Card className="pt-4" style={{ width: '400px', minHeight: '500px' }}>
          <Card.Body>
            <h2 className="text-center mb-3">Sign Up</h2>
            {validationError
              ? <Alert variant="danger">{validationError}</Alert>
              : null
            }
            <Form onSubmit={onHandleSubmit}>
              <Form.Group id="name" className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)} />
              </Form.Group>
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
              <Form.Group id="password-confirmation" className="mb-2">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  minLength={8}
                  required
                  value={passwordConfirmationInput}
                  onChange={(e) => setPasswordConfirmationInput(e.target.value)} />
              </Form.Group>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-100 mt-4">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <footer className="w-100 text-center mt-2">Already have an account? Log in.</footer>
      </div>
    </Container>
  );
};

export default Signup;

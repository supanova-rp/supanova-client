import { useCallback, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

import { useAuth } from "../../contexts/AuthContext";
import { FormSubmitEvent } from "../../types/index";

import { ReactComponent as HidePasswordIcon } from "../../icons/hidePasswordIcon.svg";
import { ReactComponent as ShowPasswordIcon } from "../../icons/showPasswordIcon.svg";
import SupanovaLogo from "../../images/Supanova-logo.png"
import { colors } from "src/constants/colorPalette";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const onHandleLogin = async (event: FormSubmitEvent) => {
    event.preventDefault();
    try {
      setValidationError("");
      setIsLoading(true);

      debugger

      const result = await login(emailInput, passwordInput);

      console.log(">>> result: ", result);

      navigate("/");
    } catch (error) {
      console.log(error);
      setValidationError("Wrong email and/or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center login-container">
      {isLoading
        ? <PulseLoader color={colors.orange} />
        : (
          <>
            <img src={SupanovaLogo} alt="Supanova Logo" className="mb-4 login-logo" />
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
                        className="email-input"
                        onChange={(e) => setEmailInput(e.target.value)} />
                    </Form.Group>
                    <Form.Group id="password" className="mb-2">
                      <Form.Label>Password</Form.Label>
                      <div className="d-flex align-items-center">
                        <Form.Control
                          type={isPasswordShowing ? "text" : "password"}
                          minLength={6}
                          required
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)} />

                        {!isPasswordShowing
                          ? (
                            <div className="ps-3 icon" onClick={() => setIsPasswordShowing(true)}>
                              <ShowPasswordIcon />
                            </div>
                          )
                          : (
                            <div className="ps-3 icon" onClick={() => setIsPasswordShowing(false)}>
                              <HidePasswordIcon />
                            </div>
                          )
                        }

                      </div>
                    </Form.Group>
                    <Button
                      disabled={isLoading}
                      type="submit"
                      className="mt-4 login-button main-button">
                      Login
                    </Button>
                  </Form>
                  <footer className="w-100 text-center mt-4 mb-2 footer-link clickable"><Link to="/forgot-password">Forgot password?</Link></footer>
                </Card.Body>
              </Card>
            </div>
          </>
        )
      }
    </div>
  );
};

export default Login;

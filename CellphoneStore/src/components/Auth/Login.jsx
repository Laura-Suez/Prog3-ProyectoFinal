import { useState, useRef, useContext } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { errorToast, successToast } from "../Notification/Notification";
import { useNavigate } from "react-router";
import { AuthenticationContext } from "../Services/Auth/auth.context";

const Login = () => {
  const navigate = useNavigate();
  const {handleUserLogin} = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.length || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: true, password: false });
      errorToast("Ingrese email válido.");
      emailRef.current.focus();
      return;
    }

    if (
      !password.length ||
      password.length < 7 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      setErrors({ email: false, password: true });
      errorToast(
        "Debes completar la contraseña, mínimo 7 caracteres, una mayúscula y un número.",
      );
      passwordRef.current.focus();
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        errorToast(errorData.message || "Error al iniciar sesión");
        return;
      }
      const token = await response.json();

      handleUserLogin(token);

      setErrors({ email: false, password: false });

      successToast("Ha iniciado sesión");

      navigate("/home");

    } catch (error) {
      console.error(error);
      errorToast("No se pudo conectar con el servidor");
    }
  };

  return (
    <Card className="mt-5 mx-3 p-3 px-5 shadow">
      <Card.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <FormGroup className="mb-4">
            <Form.Control
              type="email"
              placeholder="Ingresar email"
              onChange={handleEmailChange}
              ref={emailRef}
              value={email}
              className={errors.email ? "border border-danger" : ""}
            />
            {errors.email && (
              <p className="text-danger mt-1 mb-0">
                Debes ingresar un email válido para iniciar sesión.
              </p>
            )}
          </FormGroup>

          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              placeholder="Ingresar contraseña"
              onChange={handlePasswordChange}
              ref={passwordRef}
              value={password}
              className={errors.password ? "border border-danger" : ""}
            />
            {errors.password && (
              <p className="text-danger mt-1 mb-0">
                Debes completar la contraseña, mínimo 7 caracteres, una
                mayúscula y un número.
              </p>
            )}
          </FormGroup>

          <Row>
            <Col />
            <Col md={6} className="d-flex justify-content-end">
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => navigate("/register")}
              >
                Registrarse
              </Button>

              <Button variant="secondary" type="submit">
                Iniciar sesión
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;

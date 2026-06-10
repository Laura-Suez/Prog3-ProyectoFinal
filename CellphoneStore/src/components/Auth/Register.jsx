import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { errorToast, successToast } from "../Notification/Notification";

const Register = () => {
  const navigate = useNavigate();

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
      errorToast("Debes ingresar un email válido para registrarte.");
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
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar usuario");
      }

      successToast("Usted se ha registrado");
      navigate("/login");
      
    } catch (error) {
      console.error(error);
      errorToast(error.message);
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
                Debes ingresar un email válido para registrarte.
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
              <Button variant="secondary" type="submit">
                Registrarse
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Register;

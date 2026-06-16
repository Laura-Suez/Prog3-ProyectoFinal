import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="shadow border-0"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
          backgroundColor: "#f8f9fb",
        }}
      >
        <Card.Body className="p-5">
          <div className="text-center mb-5">
            <h2
              className="fw-bold"
              style={{
                color: "#111418",
                fontSize: "2.2rem",
              }}
            >
              Crear Cuenta
            </h2>

            <p className="text-muted">
              Regístrate para comenzar a gestionar tus pedidos y productos.
            </p>
          </div>

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-4">
              <Form.Label
                className="fw-bold text-uppercase"
                style={{
                  letterSpacing: "1px",
                  fontSize: "0.9rem",
                }}
              >
                Email
              </Form.Label>

              <Form.Control
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={handleEmailChange}
                ref={emailRef}
                className={errors.email ? "border border-danger" : ""}
                style={{
                  height: "55px",
                  borderRadius: "8px",
                }}
              />

              {errors.email && (
                <p className="text-danger mt-2 mb-0">
                  Debes ingresar un email válido.
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label
                className="fw-bold text-uppercase"
                style={{
                  letterSpacing: "1px",
                  fontSize: "0.9rem",
                }}
              >
                Contraseña
              </Form.Label>

              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={handlePasswordChange}
                ref={passwordRef}
                className={errors.password ? "border border-danger" : ""}
                style={{
                  height: "55px",
                  borderRadius: "8px",
                }}
              />

              {errors.password && (
                <p className="text-danger mt-2 mb-0">
                  Debes completar la contraseña con al menos 7 caracteres, una
                  mayúscula y un número.
                </p>
              )}
            </Form.Group>

            <Button
              type="submit"
              className="w-100 mb-3"
              style={{
                height: "60px",
                background: "linear-gradient(90deg,#030712,#0f172a,#030712)",
                border: "none",
                borderRadius: "8px",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              REGISTRARSE →
            </Button>

            <div
              className="text-center mt-4 text-muted"
              style={{ paddingBottom: "10px" }}
            >
              ¿Ya tienes una cuenta?
            </div>

            <Button
              variant="outline-secondary"
              className="w-100"
              type="button"
              onClick={() => navigate("/login")}
              style={{
                height: "55px",
                borderRadius: "8px",
              }}
            >
              Iniciar sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;

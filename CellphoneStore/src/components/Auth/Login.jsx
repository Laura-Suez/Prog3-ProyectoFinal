import { useState, useRef, useContext } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { errorToast, successToast } from "../Notification/Notification";
import { useNavigate } from "react-router";
import { AuthenticationContext } from "../Services/Auth/auth.context";

const Login = () => {
  const navigate = useNavigate();
  const { handleUserLogin } = useContext(AuthenticationContext);
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
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      setErrors({ email: false, password: true });
      errorToast(
        "Debes completar la contraseña, mínimo 8 caracteres, una mayúscula y un número.",
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
              Iniciar Sesión
            </h2>

            <p className="text-muted">
              Accede a tu cuenta para gestionar tus pedidos y productos.
            </p>
          </div>

          <Form onSubmit={handleSubmit} noValidate>
            <FormGroup className="mb-4">
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
                onChange={handleEmailChange}
                ref={emailRef}
                value={email}
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
            </FormGroup>

            <FormGroup className="mb-4">
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
                onChange={handlePasswordChange}
                ref={passwordRef}
                value={password}
                className={errors.password ? "border border-danger" : ""}
                style={{
                  height: "55px",
                  borderRadius: "8px",
                }}
              />

              {errors.password && (
                <p className="text-danger mt-2 mb-0">
                  Debes completar la contraseña, mínimo 7 caracteres, una
                  mayúscula y un número.
                </p>
              )}
            </FormGroup>

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
              INICIAR SESIÓN →
            </Button>

            <div
              className="text-center mt-4 text-muted"
              style={{ paddingBottom: "10px" }}
            >
              ¿Todavía no te registraste?
            </div>

            <Button
              variant="outline-secondary"
              className="w-100"
              type="button"
              onClick={() => navigate("/register")}
              style={{
                height: "55px",
                borderRadius: "8px",
              }}
            >
              Crear una cuenta
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;

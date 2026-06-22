import { useEffect } from "react";
import { useNavigate } from "react-router";
import Imagen from "../Services/Imagen";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home"), 10);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="container my-5 d-flex flex-column align-items-center justify-content-center min-vh-75">
      <div className="text-center" style={{ maxWidth: '700px' }}>
        <span className="error-background">404</span>

        <h2 className="error-title">ERROR 404</h2>

        <div className="px-3">
          <p className="text-muted small mb-3">
            Ups... parece que esta página no existe.
          </p>

          <div className="error-line"></div>

          <button
            className="btn btn-dark" variant="dark" onClick={() => navigate("/home")}
          >
            Volver al inicio ahora
          </button>
        </div>

        <div className="position-relative mb-4">
          <img
            src={Imagen.img}
            alt="404 Página no encontrada - TechPrecise"
            className="img-fluid"
          />
        </div>

      </div>
    </div>
  );
};

export default NotFound;

import { useEffect } from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home"), 4000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4">404 - Página no encontrada</h1>
      <p className="lead">La página que buscas no existe o fue movida.</p>
      <p>Serás redirigido al inicio en 4 segundos.</p>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={() => navigate("/home")}>
          Volver al inicio ahora
        </button>
      </div>
    </div>
  );
};

export default NotFound;

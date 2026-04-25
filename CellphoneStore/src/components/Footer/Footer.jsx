import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center text-lg-start mt-auto">
      <div className="container p-4">
        <div className="row">

          <div className="col-lg-6 col-md-12 mb-4">
            <h5 className="text-uppercase">CellphoneStore</h5>
            <p>
              
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase">Ayuda</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="/" className="text-white text-decoration-none">Contacto</a></li>
              <li><a href="/about" className="text-white text-decoration-none">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase">Redes</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Instagram</a></li>
              <li><a href="#" className="text-white text-decoration-none">Facebook</a></li>
              <li><a href="#" className="text-white text-decoration-none">Twitter</a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="text-center p-3 bg-secondary">
        © 2026 CellphoneStore
      </div>
    </footer>
  );
}

export default Footer;
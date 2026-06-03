import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="mt-auto py-5 pb-0 pt-3">
      <Container>
        <Row>
          <Col lg={6} md={12} className="mb-0">
            <h5 className="text-uppercase">TECHPRECISE</h5>
            <p className="text-muted small">
              Líderes en tecnología móvil con precisión clínica y potencia
              absoluta.
            </p>
          </Col>

          <Col lg={3} md={6} className="mb-0">
            <h5 className="text-uppercase mb-2">Ayuda</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/contact-Us" className="text-decoration-none">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/faq" className="text-decoration-none">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-0">
            <h5 className="text-uppercase mb-2">Redes</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="text-decoration-none"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com//"
                  target="_blank"
                  className="text-decoration-none"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.x.com/"
                  target="_blank"
                  className="text-decoration-none"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <div className="text-center p-3 mt-0 footer-copyright">
        © 2026 CellphoneStore — Diseñado con precisión.
      </div>
    </footer>
  );
};

export default Footer;

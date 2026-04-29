import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center text-lg-start mt-auto">

      <Container className="p-4">
        <Row>

          <Col lg={6} md={12} className="mb-4">
            <h5 className="text-uppercase">CellphoneStore</h5>
            <p>
              
            </p>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className="text-uppercase">Ayuda</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className="text-uppercase">Redes</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Twitter
                </a>
              </li>
            </ul>
          </Col>

        </Row>
      </Container>

      <div className="text-center p-3 bg-secondary">
        © 2026 CellphoneStore
      </div>

    </footer>
  );
}

export default Footer;
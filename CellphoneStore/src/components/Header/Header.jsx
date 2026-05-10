import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg" bg="white" variant="light" className="sticky-top">
      <Container>
        <Navbar.Brand href="/" className="text-primary">
          TECHPRECISE
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-menu" border-0 />

        <Navbar.Collapse id="navbar-menu">
          <Nav className="mx-auto">
            {" "}
            {/* mx-auto para centrar los links */}
            <Nav.Link href="/home">Inicio</Nav.Link>
            <Nav.Link href="/products">Productos</Nav.Link>
            <Nav.Link href="/contact-Us">Contacto</Nav.Link>
            <Nav.Link href="/faq">Preguntas frecuentes</Nav.Link>
          </Nav>

          {/* Iconos de la derecha (Usuario y Carrito) */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

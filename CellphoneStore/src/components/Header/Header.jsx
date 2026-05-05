import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#">
          CellphoneStore
        </Navbar.Brand>
        
        

        <Navbar.Toggle aria-controls="navbar-menu" />
        
        <div className="d-flex align-items-center ms-auto">
          <Nav.Link href="#" className="p-0">
          </Nav.Link>
          <Nav.Link href="#" className="p-0 ms-2">
          </Nav.Link>
        </div>
        <Navbar.Collapse id="navbar-menu">
          <Nav className="ms-auto">
            <Nav.Link href="#">INICIO</Nav.Link>
            <Nav.Link href="#productos">PRODUCTOS</Nav.Link>
            <Nav.Link href="#contacto">CONTACTO</Nav.Link>
            <Nav.Link href="#ofertas">PREGUNTAS FRECUENTES</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
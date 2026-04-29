import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
      <Container>

        <Navbar.Brand href="#">
          CellphoneStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-menu" />

        <Navbar.Collapse id="navbar-menu">
          <Nav className="ms-auto">

            <Nav.Link href="#">Inicio</Nav.Link>
            <Nav.Link href="#productos">Celulares</Nav.Link>
            <Nav.Link href="#ofertas">Accesorios</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>

          </Nav>

          <Form className="d-flex mt-3 mt-lg-0">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">
              Buscar
            </Button>
          </Form>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Header;
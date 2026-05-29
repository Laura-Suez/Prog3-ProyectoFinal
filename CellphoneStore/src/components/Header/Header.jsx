import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { BiUserCircle, BiCart } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";

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

            <Nav.Link href="/login" className="text-dark d-flex align-items-center gap-1 p-0">
              <FaRegUser size={24} className="text-secondary" />
              <span className="d-lg-none d-xl-inline fs-6"></span> 
            </Nav.Link>

            <Nav.Link href="/cart" className="text-dark p-0 position-relative">
              <MdOutlineShoppingCart size={24} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
              </span>
            </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

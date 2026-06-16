import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { BiUserCircle, BiCart } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { AuthenticationContext } from "../Services/Auth/auth.context";

const Header = () => {
  
  const { user, isAuthenticated, handleUserLogout } = useContext(AuthenticationContext);
  
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
            
            {isAuthenticated && user?.role !== "user" && (
            <Nav.Link href="/orders">Ordenes</Nav.Link>
            )}

            {isAuthenticated && user?.role !== "user" && (
            <Nav.Link href="/users">Usuarios</Nav.Link>
            )}

            {isAuthenticated && user?.role !== "user" && (
            <Nav.Link href="/inventory">Inventario</Nav.Link>
            )}

            <Nav.Link href="/contact-Us">Contacto</Nav.Link>
            <Nav.Link href="/faq">Preguntas Frecuentes</Nav.Link>
          </Nav>
          
            {isAuthenticated ? (
              <Nav className="align-items-center">
                <span className="text-muted small me-2" style={{ fontSize: '0.85rem' }}>
                  <FaRegUser size={14} className="me-1" />
                    {user.email}
                </span>
                <Nav.Link onClick={handleUserLogout} className="text-dark p-0">
                  Salir
                </Nav.Link>
              </Nav>
            ) : (
              <Nav.Link href="/login" className="text-dark d-flex align-items-center gap-1 p-0">
                <FaRegUser size={24} className="text-secondary" />
              </Nav.Link>
            )}

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

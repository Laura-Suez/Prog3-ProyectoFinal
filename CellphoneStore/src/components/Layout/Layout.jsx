import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="main-layout">
      <Header />

      <Container className="my-4 main-content">
        <Outlet />
      </Container>

      <Footer />
    </div>
  );
};
export default Layout;

import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <Container className="my-4">
        {children}
      </Container>

      <Footer />
    </>
  );
};

export default Layout
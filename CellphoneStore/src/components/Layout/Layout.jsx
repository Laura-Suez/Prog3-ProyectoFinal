import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <>
        <Header />
        <main className="container my-4">
            {children}
        </main>
        <Footer />
    </>
  );
};

export default Layout;
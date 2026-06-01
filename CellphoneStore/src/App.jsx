import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./components/Home/Home";
import ContactUs from "./components/Contact-Us/ContactUs";
import Layout from "./components/Layout/Layout";
import FaqAccordion from "./components/FAQ/FaqAccordion";
import Products from "./components/Products/Products";
import { errorToast } from "./components/Notification/Notification";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/products", {})
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudieron cargar los libros");
        }

        return res.json();
      })
      .then((data) => setProducts([...data]))
      .catch((error) => {
        console.log(error);
        errorToast("No se pudieron cargar los libros");
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home productList={products} />} />
            <Route
              path="/products"
              element={<Products productList={products} />}
            />
            <Route path="/contact-Us" element={<ContactUs />} />
            <Route path="/faq" element={<FaqAccordion />} />

            {/* <Route path="*" element={} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

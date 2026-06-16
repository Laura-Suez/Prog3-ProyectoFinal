import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./components/Home/Home";
import ContactUs from "./components/Contact-Us/ContactUs";
import Layout from "./components/Layout/Layout";
import FaqAccordion from "./components/FAQ/FaqAccordion";
import Products from "./components/Products/Products";
import { errorToast } from "./components/Notification/Notification";
import { ToastContainer } from "react-toastify";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Inventory from "./components/Products/Inventory";
import { AuthenticationContextProvider } from "./components/Services/Auth/AuthContextProvider";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/products", {})
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudieron cargar los productos");
        }

        return res.json();
      })
      .then((data) => setProducts([...data]))
      .catch((error) => {
        console.log(error);
        errorToast("No se pudieron cargar los productos");
      });
  }, []);

  return (
    <>
      <AuthenticationContextProvider>
        <BrowserRouter>
          <ToastContainer />
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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/orders" element={< />} />
            <Route path="/users" element={</>} /> */}
            <Route
              path="/inventory"
              element={<Inventory products={products} setProducts={setProducts} />}
            />
            {/* <Route path="*" element={} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthenticationContextProvider>
    </>
  );
}

export default App;

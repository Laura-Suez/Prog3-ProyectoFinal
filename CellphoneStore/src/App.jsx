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
import Orders from "./components/Orders/Orders";
import Users from "./components/Users/Users";
import { AuthenticationContextProvider } from "./components/Services/Auth/AuthContextProvider";
import { CartProvider } from "./components/Cart/ProviderCart";
import CheckoutConfirmation from "./components/Cart/CheckoutConfirmation";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";
import CartForm from "./components/Cart/CartForm";

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

  // La tienda (Home/Products) solo muestra productos activos; el panel de
  // Inventario sigue recibiendo la lista completa para poder reactivarlos.
  const activeProducts = products.filter((product) => product.active);

  return (
    <>
      <AuthenticationContextProvider>
        <CartProvider>
          <BrowserRouter>
            <ToastContainer />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route
                  path="/home"
                  element={<Home productList={activeProducts} />}
                />
                <Route
                  path="/products"
                  element={<Products productList={activeProducts} />}
                />
                <Route path="/contact-Us" element={<ContactUs />} />
                <Route path="/faq" element={<FaqAccordion />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                                path="/orders"
                                element={
                                  <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
                                    <Orders />
                                  </ProtectedRoute>
                                }
                              />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inventory"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
                      <Inventory
                        products={products}
                        setProducts={setProducts}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route path="/Cart" element={<CartForm />} />
                <Route path="/cart/checkout" element={<CheckoutConfirmation />} />
              </Route>
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthenticationContextProvider>
    </>
  );
}

export default App;

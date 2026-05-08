import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./components/Home/Home";
import ContactUs from "./components/Contact-Us/ContactUs";
import Layout from "./components/Layout/Layout";

function App() {
  // const productList = [
  //   {
  //     id: 1,
  //     name: "Redmi Buds 6",
  //     image: "/accesories/AirpodsBluetoothRedmiBuds6.webp",
  //     category: "Accessories",
  //     price: 38000,
  //     description:
  //       "Auriculares inalámbricos con sonido nítido y buena autonomía.",
  //   },
  //   {
  //     id: 2,
  //     name: "Redmi Buds 8",
  //     image: "/accesories/AudífonosInalámbricosXiaomiRedmiBuds8.webp",
  //     category: "Accessories",
  //     price: 45000,
  //     description:
  //       "Versión mejorada con cancelación de ruido y diseño elegante.",
  //   },
  //   {
  //     id: 3,
  //     name: "Redmi Buds 5 Pro",
  //     image: "/accesories/AuricularesXiaomiRedmi.webp",
  //     category: "Accessories",
  //     price: 105000,
  //     description:
  //       "Auriculares inalámbricos con cancelación activa de ruido, sonido de alta calidad y mayor autonomía para uso diario.",
  //   },
  //   {
  //     id: 4,
  //     name: "Xiaomi Portable Power Bank",
  //     image: "/accesories/CargadorPortátilXiaomi.webp",
  //     category: "Accessories",
  //     price: 45000,
  //     description:
  //       "Batería externa de alta capacidad para cargar tus dispositivos.",
  //   },
  //   {
  //     id: 5,
  //     name: "Xiaomi 67W Cargador",
  //     image: "/accesories/CargadorXiaomi.webp",
  //     category: "Accessories",
  //     price: 43000,
  //     description:
  //       "Cargador rápido de 67W compatible con múltiples dispositivos.",
  //   },
  //   {
  //     id: 6,
  //     name: "Smart Band 10",
  //     image: "/accesories/SmartwachXiaomiMiBand10Glaciar.webp",
  //     category: "Accessories",
  //     price: 70500,
  //     description: "Pulsera inteligente con monitoreo de salud y actividad.",
  //   },
  //   {
  //     id: 7,
  //     name: "Redmi Watch 5 Lite",
  //     image: "/accesories/SmartwatchXiaomiRedmi5Lite.webp",
  //     category: "Accessories",
  //     price: 81000,
  //     description:
  //       "Smartwatch liviano con funciones deportivas y notificaciones.",
  //   },
  //   {
  //     id: 8,
  //     name: "Watch 5 Active",
  //     image: "/accesories/SmartwatchXiaomiWatch5Active.webp",
  //     category: "Accessories",
  //     price: 58000,
  //     description: "Reloj inteligente con diseño moderno y múltiples sensores.",
  //   },
  //   {
  //     id: 9,
  //     name: "Smart Band 10 Silver",
  //     image: "/accesories/XiaomiSmartBand10Plateado.webp",
  //     category: "Accessories",
  //     price: 70500,
  //     description: "Pulsera fitness elegante con pantalla AMOLED.",
  //   },

  //   {
  //     id: 10,
  //     name: "Samsung Galaxy A23",
  //     image: "/phones/SamsungGalaxyA23.webp",
  //     category: "Phones",
  //     price: 250000,
  //     description: "Smartphone equilibrado con buena batería y rendimiento.",
  //   },
  //   {
  //     id: 11,
  //     name: "Xiaomi Poco M7",
  //     image: "/phones/CelularXiaomiPocoM7.webp",
  //     category: "Phones",
  //     price: 361000,
  //     description: "Teléfono económico con gran rendimiento para el día a día.",
  //   },
  //   {
  //     id: 12,
  //     name: "Redmi Note 14 Pro",
  //     image: "/phones/XiaomiRedmiNote14Pro.webp",
  //     category: "Phones",
  //     price: 400000,
  //     description: "Gama media potente con excelente cámara.",
  //   },
  //   {
  //     id: 13,
  //     name: "iPhone 15",
  //     image: "/phones/Iphone15.webp",
  //     category: "Phones",
  //     price: 1022000,
  //     description: "Alto rendimiento, cámara avanzada y ecosistema Apple.",
  //   },
  //   {
  //     id: 14,
  //     name: "iPhone 16",
  //     image: "/phones/Iphone16.webp",
  //     category: "Phones",
  //     price: 1800000,
  //     description: "Nueva generación con mejoras en rendimiento y batería.",
  //   },
  //   {
  //     id: 15,
  //     name: "iPhone 17",
  //     image: "/phones/Iphone17.webp",
  //     category: "Phones",
  //     price: 2100000,
  //     description: "Última tecnología con diseño renovado y máxima potencia.",
  //   },
  //   {
  //     id: 16,
  //     name: "Samsung Galaxy A36",
  //     image: "/phones/SamsungGalaxyA36.webp",
  //     category: "Phones",
  //     price: 615000,
  //     description: "Excelente opción de gama media con buen desempeño.",
  //   },
  //   {
  //     id: 17,
  //     name: "Samsung Galaxy Z Flip",
  //     image: "/phones/SamsungGalaxyZFlip.webp",
  //     category: "Phones",
  //     price: 1400000,
  //     description: "Teléfono plegable con diseño innovador.",
  //   },
  //   {
  //     id: 18,
  //     name: "Xiaomi Redmi Note 15",
  //     image: "/phones/XiaomiNote15.webp",
  //     category: "Phones",
  //     price: 420000,
  //     description: "Modelo actualizado con mejoras en cámara y rendimiento.",
  //   },
  // ];

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact-Us" element={<ContactUs />} />
            {/* <Route path="/cellphones" element={} />
            <Route path="/accesories" element={} />
           
            <Route path="*" element={} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

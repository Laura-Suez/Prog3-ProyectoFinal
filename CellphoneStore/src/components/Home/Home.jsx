import React from "react";
import Carousels from "../Carousel/Carousel";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

const Home = ({ productList }) => {
  return (
    <>
      <Carousels />
      <h2
        style={{
          textAlign: "center",
          margin: "40px 0 20px",
        }}
      >
        Productos Destacados
      </h2>
      <ProductCarousel products={productList} />
    </>
  );
};

export default Home;

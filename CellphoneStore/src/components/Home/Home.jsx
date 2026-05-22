import React from "react";
import Carousels from "../Carousel/Carousel";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

const Home = ({ productList }) => {
  return (
    <>
      <Carousels />

      <ProductCarousel products={productList} />
    </>
  );
};

export default Home;
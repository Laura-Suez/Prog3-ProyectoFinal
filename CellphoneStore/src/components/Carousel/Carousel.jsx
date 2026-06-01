import Carousel from "react-bootstrap/Carousel";

function Carousels() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d./-block w-100"
          src="/carousel/Banner1.jpg"
          alt="slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/carousel/Banner2.webp"
          alt="slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/carousel/Banner3.webp"
          alt="slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;

import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import ProductCard from "../ProductCard/ProductCard";

function ProductCarousel({ products }) {
  const [startIndex, setStartIndex] = useState(0);

  const visibleProducts = products.slice(startIndex, startIndex + 3);

  const handleNext = () => {
    if (startIndex < products.length - 3) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div>
      <Row className="justify-content-center align-items-center p-4">
        
        <Col xs="auto">
          <Button
            variant="light"
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="rounded-circle"
          >
            <FaChevronLeft />
          </Button>
        </Col>

        {visibleProducts.map((product) => (
          <Col
            md={3}
            key={product.id}
            className="d-flex justify-content-center"
          >
            <ProductCard product={product} />
          </Col>
        ))}

        <Col xs="auto">
          <Button
            variant="light"
            onClick={handleNext}
            disabled={startIndex >= products.length - 3}
            className="rounded-circle"
          >
            <FaChevronRight />
          </Button>
        </Col>

      </Row>
    </div>
  );
}

export default ProductCarousel;
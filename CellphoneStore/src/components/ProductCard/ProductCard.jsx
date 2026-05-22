import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard({ product }) {
  return (
    <Card className="product-card shadow-sm border-0">
      <Card.Img
        variant="top"
        src={product.image}
        className="product-card-img"
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>

        <Card.Text>{product.description}</Card.Text>

        <h4 className="mt-auto">${product.price.toLocaleString()}</h4>

        <Button variant="dark">Comprar</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

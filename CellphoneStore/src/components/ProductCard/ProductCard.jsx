import { useContext } from "react"; 
import { CartContext } from "../Cart/CartContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);
  
  return (
    <Card className="product-card shadow-sm border-0 h-100">
      <Card.Img
        variant="top"
        src={product.image}
        className="product-card-img"
      />

      <Card.Body className="d-flex flex-column">
        {/* Forzamos una altura mínima al título para que si ocupa 2 renglones no desfase todo */}
        <Card.Title style={{ minHeight: "50px" }}>{product.name}</Card.Title>

        {/* FIJAMOS LA ALTURA DE LA DESCRIPCIÓN:
          - height: "75px" (ajusta este número según tus renglones)
          - overflow: "hidden" (evita que el texto se desborde)
        */}
        <Card.Text style={{ height: "75px", overflow: "hidden" }}>
          {product.description}
        </Card.Text>

        <h4 className="mt-auto">${product.price.toLocaleString()}</h4>

        <Button variant="dark" onClick={() => {
          console.log("Hiciste clic en:", product.name);
          addToCart(product);
        }}
        >
          Añadir al Carrito
        </Button>
      </Card.Body>
    </Card >
  );
}

export default ProductCard;

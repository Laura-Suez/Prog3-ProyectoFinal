import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useCart } from "./useCart";
import { useNavigate } from "react-router";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    itemCount,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();


return (
    <div className="shopping-cart">
        <h1 className="mb-4">Carrito de Compras</h1>

        {cartItems.length === 0 ? (
            <div className="alert alert-secondary" role="status">
                Tu carrito está vacío. Añade productos desde la sección de productos.
            </div>
        ) : (
            <>
                <Table responsive bordered hover className="align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.price.toLocaleString()}</td>
                                <td>
                                    <div className="d-flex gap-2 align-items-center">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                        >
                                            -
                                        </Button>
                                        <span>{item.quantity}</span>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                </td>
                                <td>${(item.price * item.quantity).toLocaleString()}</td>
                                <td>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                    <Button variant="secondary" onClick={clearCart}>
                        Vaciar carrito
                    </Button>

                    <div className="text-end">
                        <p className="mb-1">Artículos totales: {itemCount}</p>
                        <h4>Total: ${totalPrice.toLocaleString()}</h4>
                    </div>

                    <Button variant="primary" onClick={() => navigate("/checkout")}>
                        Finalizar compra
                    </Button>
                </div>
            </>
        )}
    </div>
);
};

export default ShoppingCart;

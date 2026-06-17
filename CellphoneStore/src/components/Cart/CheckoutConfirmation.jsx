import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router";
import { errorToast } from "../Notification/Notification";
import { AuthenticationContext } from "../Services/Auth/auth.context";
import { useCart } from "./useCart";

const CheckoutConfirmation = () => {
    const { cartItems, totalPrice, itemCount, clearCart } = useCart();
    const { token } = useContext(AuthenticationContext);
    const [confirmation, setConfirmation] = useState(null);
    const navigate = useNavigate();

    //chequea que este logueado si tiene token, si no lo está le muestra una alarta y lo redirige a logearse
    const handleConfirmPurchase = async () => {
        if (!token) {
            errorToast("Debes iniciar sesión para confirmar la compra.");
            navigate("/login");
            return;
        }

        try {
            //guarda el precio y la lista de producto de la orden a la BDD
            const response = await fetch("http://localhost:3000/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ productIds: cartItems.map(item => item.id) })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al crear la orden");
            }

            //recibe la respuesta del servidor y guarda los datos de la compra confirmada
            const order = await response.json();
            setConfirmation({
                orderNumber: order.id,
                items: cartItems,
                itemCount,
                totalPrice,
            });
            clearCart();
        } catch (error) {
            console.error(error);
            errorToast(error.message || "No se pudo confirmar la compra");
        }
    };

    if (confirmation) {
        return (
            <div className="checkout-confirmation">
                <h1 className="mb-4">Compra confirmada</h1>
                <div className="alert alert-success">
                    ¡Gracias por tu compra! Tu pedido #{confirmation.orderNumber} se ha
                    procesado correctamente.
                </div>

                <div className="mb-4">
                    <p className="mb-1">Artículos comprados: {confirmation.itemCount}</p>
                    <p className="mb-1">
                        Total pagado: ${confirmation.totalPrice.toLocaleString()}
                    </p>
                </div>

                <Button variant="primary" onClick={() => navigate("/home")}>
                    Volver al inicio
                </Button>
            </div>
        );
    }

    return (

        <div className="checkout-confirmation">
            <h1 className="mb-4">Confirmar compra</h1>

            {cartItems.length === 0 ? (
                <div className="alert alert-secondary" role="status">
                    Tu carrito está vacío. Añade productos antes de confirmar la compra.
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
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>${item.price.toLocaleString()}</td>
                                    <td>{item.quantity}</td>
                                    <td>${(item.price * item.quantity).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {cartItems.length > 0 && (
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                            <div className="text-end">
                                <p className="mb-1">Artículos totales: {itemCount}</p>
                                <h4>Total: ${totalPrice.toLocaleString()}</h4>
                            </div>

                            <Button variant="success" onClick={handleConfirmPurchase}>
                                Confirmar compra
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CheckoutConfirmation;
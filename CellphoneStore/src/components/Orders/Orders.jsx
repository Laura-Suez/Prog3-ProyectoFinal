import { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import { AuthenticationContext } from "../Services/Auth/auth.context";
import { errorToast, successToast } from "../Notification/Notification";

const API_URL = "http://localhost:3000/order";

const Orders = () => {
  const { token } = useContext(AuthenticationContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudieron cargar las órdenes.");
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => errorToast(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const openConfirm = (order) => {
    setSelectedOrder(order);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setSelectedOrder(null);
  };

  const handleDelete = async () => {
    if (!selectedOrder) return;

    const order = selectedOrder;
    setShowConfirm(false);
    setDeletingId(order.id);

    try {
      const res = await fetch(`${API_URL}/${order.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "No se pudo eliminar la orden.");
      }

      setOrders((current) => current.filter((o) => o.id !== order.id));
      successToast("Orden eliminada correctamente.");
    } catch (err) {
      errorToast(err.message);
    } finally {
      setDeletingId(null);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">ÓRDENES</h1>
      <p className="text-secondary mb-4">
        Listado de órdenes realizadas por los usuarios.
      </p>

      {loading ? (
        <p>Cargando órdenes...</p>
      ) : orders.length === 0 ? (
        <p className="text-secondary">Todavía no hay órdenes registradas.</p>
      ) : (
        <Table responsive bordered hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user?.email || "—"}</td>
                <td>
                  <div className="d-flex flex-wrap gap-1">
                    {order.products?.length ? (
                      order.products.map((product) => (
                        <Badge key={product.id} bg="secondary">
                          {product.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-secondary">Sin productos</span>
                    )}
                  </div>
                </td>
                <td>${Number(order.total).toLocaleString()}</td>
                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    disabled={deletingId === order.id}
                    onClick={() => openConfirm(order)}
                  >
                    {deletingId === order.id ? "Eliminando..." : "Eliminar"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Querés eliminar la orden #{selectedOrder?.id}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deletingId === selectedOrder?.id}
          >
            {deletingId === selectedOrder?.id ? "Eliminando..." : "Eliminar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;

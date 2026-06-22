import React, { useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthenticationContext } from "../Services/Auth/auth.context";
import { errorToast, successToast } from "../Notification/Notification";

// Estado inicial del formulario (también se usa para limpiarlo tras guardar)
const initialProductForm = {
  name: "",
  image: "",
  category: "",
  price: "",
  description: "",
  active: true,
  stock: "",
};

const CATEGORIES = ["Celulares", "Accesorios"];

const Inventory = ({ products = [], setProducts }) => {
  const { token } = useContext(AuthenticationContext); // credencial para los pedidos protegidos
  const [productForm, setProductForm] = useState(initialProductForm); // datos del formulario
  const [editingProductId, setEditingProductId] = useState(null); // si tiene id, estamos editando; si es null, creando
  const [savingProduct, setSavingProduct] = useState(false); // deshabilita el botón mientras se guarda
  const [productToToggle, setProductToToggle] = useState(null); // producto pendiente de dar de baja/reactivar
  const [togglingId, setTogglingId] = useState(null); // id del producto cuyo estado se está cambiando

  // Vuelve el formulario a su estado inicial y sale del modo edición.
  const resetForm = () => {
    setProductForm(initialProductForm);
    setEditingProductId(null);
  };

  // Actualiza el campo del formulario que el usuario está modificando.
  // Para el switch "Activo" usamos `checked` en vez de `value`.
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProductForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Carga los datos de un producto en el formulario para editarlo.
  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name || "",
      image: product.image || "",
      category: product.category || "",
      price: product.price?.toString() || "",
      description: product.description || "",
      active: Boolean(product.active),
      stock: product.stock?.toString() || "",
    });
  };

  // Guarda el producto: crea uno nuevo (POST) o actualiza el existente (PUT).
  const handleSaveProduct = async (event) => {
    event.preventDefault(); // evita que el formulario recargue la página

    // Validación de campos obligatorios antes de enviar al backend.
    if (
      !productForm.name ||
      !productForm.image ||
      !productForm.category ||
      !productForm.price ||
      !productForm.stock
    ) {
      errorToast("Nombre, imagen, categoría, precio y stock son obligatorios.");
      return;
    }

    if (!token) {
      errorToast("Necesitás iniciar sesión como administrador.");
      return;
    }

    // Convertimos precio y stock a número antes de mandarlos.
    const payload = {
      name: productForm.name,
      image: productForm.image,
      category: productForm.category,
      price: Number(productForm.price),
      description: productForm.description,
      active: productForm.active,
      stock: Number(productForm.stock),
    };

    setSavingProduct(true);

    try {
      // Si estamos editando usamos PUT sobre el id; si no, POST para crear.
      const method = editingProductId ? "PUT" : "POST";
      const url = editingProductId
        ? `http://localhost:3000/products/${editingProductId}`
        : "http://localhost:3000/products";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "No se pudo guardar el producto.");
      }

      if (editingProductId) {
        // El backend devuelve solo un mensaje al actualizar, así que
        // reconstruimos el producto editado en el estado local.
        const updatedProduct = { id: editingProductId, ...payload };
        setProducts((current) =>
          current.map((item) =>
            item.id === editingProductId ? updatedProduct : item,
          ),
        );
        successToast("Producto actualizado correctamente.");
      } else {
        // Al crear, el backend sí devuelve el producto nuevo (con su id),
        // así que lo agregamos a la lista existente.
        const newProduct = await response.json();
        setProducts((current) => [...current, newProduct]);
        successToast("Producto creado correctamente.");
      }

      resetForm(); // limpiamos el formulario para la próxima carga
    } catch (err) {
      errorToast(err.message);
    } finally {
      setSavingProduct(false);
    }
  };

  // Abre el modal de confirmación recordando qué producto se quiere cambiar.
  const openToggleConfirm = (product) => {
    if (!token) {
      errorToast("Necesitás iniciar sesión como administrador.");
      return;
    }
    setProductToToggle(product);
  };

  // Cierra el modal y olvida el producto seleccionado.
  const closeToggleConfirm = () => {
    setProductToToggle(null);
  };

  // Da de baja o reactiva el producto seleccionado cambiando su flag `active`
  // (baja lógica). Se ejecuta al confirmar en el modal.
  const confirmToggleActive = async () => {
    if (!productToToggle) return;

    const product = productToToggle;
    const nextActive = !product.active; // invertimos el estado actual
    setProductToToggle(null);
    setTogglingId(product.id); // marcamos este producto como "en proceso de cambio"

    try {
      // Baja lógica: actualizamos el flag `active` en vez de borrar el producto.
      const response = await fetch(
        `http://localhost:3000/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...product, active: nextActive }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "No se pudo actualizar el producto.",
        );
      }

      setProducts((current) =>
        current.map((item) =>
          item.id === product.id ? { ...item, active: nextActive } : item,
        ),
      );
      if (editingProductId === product.id) resetForm();
      successToast(
        nextActive
          ? "Producto reactivado correctamente."
          : "Producto dado de baja correctamente.",
      );
    } catch (err) {
      errorToast(err.message);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="admin-panel container mt-4">
      <h1 className="mb-4">INVENTARIO</h1>
      <p className="text-secondary mb-4">
        Aquí puedes gestionar tus productos.
      </p>

      {/* Sección 1: formulario para crear o editar un producto */}
      <section className="mb-5">
        {/* El título cambia según estemos creando o editando */}
        <h2>{editingProductId ? "Editar producto" : "Agregar producto"}</h2>
        <Form onSubmit={handleSaveProduct}>
          <div className="row gy-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="name"
                  value={productForm.name}
                  onChange={handleInputChange}
                  placeholder="Nombre del producto"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control
                  name="image"
                  value={productForm.image}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="category"
                  value={productForm.category}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar categoría</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  name="stock"
                  type="number"
                  value={productForm.stock}
                  onChange={handleInputChange}
                  placeholder="Cantidad"
                />
              </Form.Group>
            </div>
            <div className="col-12">
              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  rows={3}
                  value={productForm.description}
                  onChange={handleInputChange}
                  placeholder="Descripción del producto"
                />
              </Form.Group>
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
              <Form.Check
                type="switch"
                id="product-active-switch"
                name="active"
                checked={productForm.active}
                onChange={handleInputChange}
                label="Activo"
              />
              <Button type="submit" variant="primary" disabled={savingProduct}>
                {savingProduct
                  ? "Guardando..."
                  : editingProductId
                    ? "Actualizar producto"
                    : "Agregar producto"}
              </Button>
              {editingProductId && (
                <Button variant="secondary" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        </Form>
      </section>

      {/* Sección 2: tabla con todos los productos cargados */}
      <section>
        <h2 className="mb-4">Productos existentes</h2>
        <Table responsive bordered hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${Number(product.price).toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>{product.active ? "Sí" : "No"}</td>
                <td className="d-flex gap-2">
                  {/* Botón Editar: carga el producto en el formulario de arriba */}
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => handleEditProduct(product)}
                  >
                    Editar
                  </Button>
                  {/* Botón que alterna entre dar de baja y reactivar según el estado */}
                  <Button
                    size="sm"
                    variant={
                      product.active ? "outline-danger" : "outline-success"
                    }
                    disabled={togglingId === product.id}
                    onClick={() => openToggleConfirm(product)}
                  >
                    {product.active ? "Dar de baja" : "Reactivar"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      {/* Modal de confirmación: pide aprobar antes de dar de baja o reactivar */}
      <Modal show={!!productToToggle} onHide={closeToggleConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Querés eliminar el producto #{productToToggle?.id}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeToggleConfirm}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={confirmToggleActive}
            disabled={togglingId === productToToggle?.id}
          >
            {togglingId === productToToggle?.id ? "Eliminando..." : "Eliminar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inventory;

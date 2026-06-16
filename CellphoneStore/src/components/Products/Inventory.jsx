import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const initialProductForm = {
  name: "",
  image: "",
  category: "",
  price: "",
  description: "",
  active: true,
  stock: "",
};

const CATEGORIES = ["Cellphones", "Accesories"];

const Inventory = ({ products = [], setProducts }) => {
  const [productForm, setProductForm] = useState(initialProductForm);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productError, setProductError] = useState("");
  const [savingProduct, setSavingProduct] = useState(false);

  const resetForm = () => {
    setProductForm(initialProductForm);
    setEditingProductId(null);
    setProductError("");
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProductForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
    setProductError("");
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    setProductError("");

    if (
      !productForm.name ||
      !productForm.image ||
      !productForm.category ||
      !productForm.price ||
      !productForm.stock
    ) {
      setProductError(
        "Nombre, imagen, categoría, precio y stock son obligatorios.",
      );
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setProductError("Necesitás iniciar sesión como administrador.");
      return;
    }

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
      } else {
        const newProduct = await response.json();
        setProducts((current) => [...current, newProduct]);
      }

      resetForm();
    } catch (err) {
      setProductError(err.message);
    } finally {
      setSavingProduct(false);
    }
  };

  return (
    <div className="admin-panel container mt-4">
      <h1 className="mb-4">INVENTARIO</h1>
      <p className="text-secondary mb-4">
        Aquí puedes gestionar tus productos.
      </p>

      {productError && <div className="alert alert-danger">{productError}</div>}

      <section className="mb-5">
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
              <th>Editar</th>
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
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => handleEditProduct(product)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  );
};

export default Inventory;

import { Order, Product, User } from "../models/models.js";

// --- MIDDLEWARE ---

// verifyToken importado en orders.routes desde authServices.js, no hace falta repetirlo

// --- SERVICIOS ---

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ["id", "email"] },
        { model: Product },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las órdenes" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0)
      return res
        .status(400)
        .json({ message: "Debés incluir al menos un producto" });

    // Validar que cada item tenga productId y quantity
    const validItems = items.every(
      (item) => item.productId && item.quantity > 0,
    );
    if (!validItems)
      return res
        .status(400)
        .json({ message: "Cada item debe tener productId y quantity válidos" });

    // Buscamos los productos reales para calcular el total en el servidor
    // y no confiar en un total enviado por el cliente.
    const productIds = items.map((item) => item.productId);
    const products = await Product.findAll({ where: { id: productIds } });

    if (products.length !== productIds.length)
      return res
        .status(400)
        .json({ message: "Uno o más productos no existen" });

    // Calcular total considerando cantidades
    const total = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + Number(product.price) * item.quantity;
    }, 0);

    const userId = req.user.id;

    const order = await Order.create({ total, userId });

    // Agregar productos con cantidad a través de la tabla intermedia
    for (const item of items) {
      await order.addProducts([item.productId], {
        through: { quantity: item.quantity },
      });
    }

    const createdOrder = await Order.findByPk(order.id, { include: Product });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error al crear la orden" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { total } = req.body;

    if (!total || total <= 0)
      return res.status(400).json({ message: "El total debe ser mayor a 0" });

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    const isOwner = order.userId === req.user.id;
    const isAdmin = ["admin", "super-admin"].includes(req.user.role);

    if (!isOwner && !isAdmin)
      return res
        .status(403)
        .json({ message: "No tenés permiso sobre esta orden" });

    await order.update({ total });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la orden" });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    const isOwner = order.userId === req.user.id;
    const isAdmin = ["admin", "super-admin"].includes(req.user.role);

    if (!isOwner && !isAdmin)
      return res
        .status(403)
        .json({ message: "No tenés permiso sobre esta orden" });

    await order.destroy();

    res.json({ message: `Orden con id ${id} eliminada correctamente` });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la orden" });
  }
};

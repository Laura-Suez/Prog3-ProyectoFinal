import { Product } from "../models/models.js";

// --- MIDDLEWARE ---

// verifyToken importado en products.routes desde authServices.js, no hace falta repetirlo

// --- SERVICIOS ---

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, image, category, price, description, active, stock } =
      req.body;

    if (!name)
      return res
        .status(400)
        .json({ message: "El nombre del producto es un campo obligatorio" });

    if (!price)
      return res.status(400).json({ message: "El precio es obligatorio" });

    if (!category)
      return res.status(400).json({ message: "La categoría es obligatoria" });

    const newProduct = await Product.create({
      name,
      image,
      category,
      price,
      description,
      active,
      stock,
    });

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, category, price, description, active, stock } =
      req.body;

    if (!name)
      return res
        .status(400)
        .json({ message: "El nombre del producto es un campo obligatorio" });

    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    await product.update({
      name,
      image,
      category,
      price,
      description,
      active,
      stock,
    });

    res.json({ message: "El producto ha sido actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    await product.destroy();

    res.json({ message: "El producto ha sido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

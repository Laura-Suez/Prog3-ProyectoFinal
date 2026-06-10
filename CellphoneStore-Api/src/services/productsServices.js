import { Product } from "../models/Product.js";

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
    if (!product) {
      return res.status(404).send("Producto no encontrado.");
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, image, category, price, description, active, stock } =
      req.body;

    if (!name) {
      return res
        .status(400)
        .send("El nombre del producto es un campo obligatorio.");
    }

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

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Producto no encontrado.");
    }
    if (!name) {
      return res
        .status(400)
        .send("El nombre del producto es un campo obligatorio.");
    }

    await product.update({
      name,
      image,
      category,
      price,
      description,
      active,
      stock,
    });

    res.send("El producto ha sido actualizado correctamente.");
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Producto no encontrado.");
    }
    await product.destroy();
    res.send("El producto ha sido eliminado correctamente.");
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

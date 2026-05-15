import { Router } from "express";
import { Product } from "../models/Product.js";

const router = Router();

router.get("/products", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  res.json(product);
});

router.post("/products", async (req, res) => {
  const { name, image, category, price, description, active, stock} = req.body;
  const newProduct = await Product.create({
    name, 
    image, 
    category, 
    price, 
    description, 
    active, 
    stock
  })
  res.json(newProduct)
});

router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, image, category, price, description, active, stock} = req.body;

  const product = await Product.findByPk(id);

  await product.update({
    name, 
    image, 
    category, 
    price, 
    description, 
    active, 
    stock
  });

  await product.save();

  res.json(product);

});

router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  await product.destroy();

  res.send(`Borrando producto con id: ${id}`);
});

export default router;

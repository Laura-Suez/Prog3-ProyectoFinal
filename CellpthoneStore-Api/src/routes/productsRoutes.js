import { Router } from "express";

const router = Router();

router.get("/products", (req, res) => {
  res.send("Obteniendo productos");
});

router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo producto con id: ${id}`);
});

router.post("/products", (req, res) => {
  res.send("Creando producto");
});

router.put("/products/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando producto con id: ${id}`);
});

router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando producto con id: ${id}`);
});

export default router;

import { Router } from "express";

const router = Router();

router.get("/cellphones", (req, res) => {
  res.send("Obteniendo celulares");
});

router.get("/cellphones/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo celular con id: ${id}`);
});

router.post("/cellphones", (req, res) => {
  res.send("Creando celuS");
});

router.put("/cellphones/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando celu con id: ${id}`);
});

router.delete("/cellphones/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando celular con id: ${id}`);
});

export default router;

import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productsServices.js";
import { verifyToken, authorizeRoles } from "../services/authServices.js";

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post(
  "/products",
  verifyToken, //autenticación: el usuario debe estar logueado
  authorizeRoles("admin", "super-admin"), //autorización: el usuario debe tener rol admin o super-admin
  createProduct,
);
router.put(
  "/products/:id",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  updateProduct,
);
router.delete(
  "/products/:id",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  deleteProduct,
);

export default router;

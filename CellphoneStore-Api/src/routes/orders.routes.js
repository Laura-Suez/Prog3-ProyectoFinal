import { Router } from "express";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/orderServices.js";
import { verifyToken, authorizeRoles } from "../services/authServices.js";

const router = Router();

router.get(
  "/order",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  getOrders,
);
router.post("/order", verifyToken, createOrder);
router.put(
  "/order/:id",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  updateOrder,
);
router.delete(
  "/order/:id",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  deleteOrder,
);

export default router;

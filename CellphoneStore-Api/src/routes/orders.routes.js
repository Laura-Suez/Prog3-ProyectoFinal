import { Router } from "express";
import {
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/orderServices.js";
import { verifyToken } from "../services/authServices.js";

const router = Router();

router.post("/order", verifyToken, createOrder);
router.put("/order/:id", verifyToken, updateOrder);
router.delete("/order/:id", verifyToken, deleteOrder);

export default router;

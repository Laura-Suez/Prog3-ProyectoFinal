import { Router } from "express";
import { registerUser, loginUser } from "../services/authService.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/user", async (req, res) => {

  const users = await User.findAll();
  
  res.json(users);
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  res.json(user);
});

router.post("/user", async (req, res) => {
  const { email, password, role, active } = req.body;

  const newUser = await User.create({
    email,
    password,
    role,
    active,
  });

  res.json(newUser);
});

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { email, password, role, active } = req.body;

  const user = await User.findByPk(id);

  await user.update({
    email,
    password,
    role,
    active,
  });

  res.json(user);
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  await user.destroy();

  res.send(`Borrando usuario con id: ${id}`);
  });

export default router;
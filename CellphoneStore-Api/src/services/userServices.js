import bcrypt from "bcrypt";
import { User } from "../models/models.js";

// --- MIDDLEWARE ---

// verifyToken importado desde authServices.js, no hace falta repetirlo

// --- SERVICIOS ---

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, role, active } = req.body;

    if (!email)
      return res.status(400).json({ message: "El email es obligatorio" });

    const user = await User.findByPk(id);

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    let hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    await user.update({ email, password: hashedPassword, role, active });

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      active: user.active,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update({ active: false }); //baja lógica

    res.json({ message: `Usuario con id ${id} desactivado correctamente` });
  } catch (error) {
    res.status(500).json({ message: "Error al desactivar usuario" });
  }
};

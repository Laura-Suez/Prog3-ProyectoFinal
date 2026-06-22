import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/models.js";

// --- SERVICIOS ---

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

// validacion de mail y password antes de continuar con el registro 
  if (!email || !emailRegex.test(email))
    return res.status(400).json({ message: "El email no es válido" });
  
  if (!password || !passwordRegex.test(password))
    return res.status(400).json({
      message:
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
    });

  try {
    const user = await User.findOne({ where: { email } });

    if (user)
      return res
        .status(400)
        .json({ message: "Este email ya se encuentra registrado." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword });

    res.json(newUser.id);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const loginUser = async (req, res) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || !emailRegex.test(email))
    return res.status(400).json({ message: "El email no es válido" });

  if (!password)
    return res.status(400).json({ message: "La contraseña es obligatoria" });

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: "Usuario no existente" });

    if (!user.active)
      return res.status(403).json({ message: "La cuenta está desactivada" });

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison)
      return res
        .status(401)
        .json({ message: "Email y/o contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secretKey,
      { expiresIn: "1h" },
    );

    return res.json(token);
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

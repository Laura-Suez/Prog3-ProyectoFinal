import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/models.js";

// --- MIDDLEWARE ---

export const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1]; 
  const secretKey = process.env.JWT_SECRET_KEY;

  // validacion
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "No tenés permisos para realizar esta acción" });
    }
    next();
  };
};

// --- SERVICIOS ---

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email))
    return res.status(400).json({ message: "El email no es válido" });

  if (!password || password.length < 8)
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 8 caracteres" });

  const user = await User.findOne({ where: { email } });

  if (user)
    return res
      .status(400)
      .json({ message: "Este email ya se encuentra registrado." });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({ email, password: hashedPassword });

  res.json(newUser.id);
};

export const loginUser = async (req, res) => {
  const secretKey = process.env.JWT_SECRET_KEY;
 
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email))
    return res.status(400).json({ message: "El email no es válido" });

  if (!password)
    return res.status(400).json({ message: "La contraseña es obligatoria" });

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(401).json({ message: "Usuario no existente" });

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison)
    return res.status(401).json({ message: "Email y/o contraseña incorrecta" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secretKey,
    { expiresIn: "1h" },
  );

  return res.json(token);
};

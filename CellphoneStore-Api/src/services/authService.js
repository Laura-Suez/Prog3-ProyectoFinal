import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const secretKey = "CellPhone-2025";

export const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No autorizado",
    });
  }

  try {
    const payload = jwt.verify(token, secretKey);

    req.user = payload;

    next();
  } catch {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
};

export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email }
    });

    
    if (user)
        return res.status(400).send({ message: "Este email ya se encuentra registrado." });

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        email,
        password: hashedPassword, 
    });

    res.json(newUser.id);
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email }
    });

    
    if (!user)
        return res.status(401).send({ message: "Usuario no existente" });

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison)
        return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

    return res.json(token);
}
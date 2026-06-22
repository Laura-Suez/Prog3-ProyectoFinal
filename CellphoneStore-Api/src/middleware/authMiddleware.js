import jwt from "jsonwebtoken";

// --- MIDDLEWARE ---

export const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1]; 
  const secretKey = process.env.JWT_SECRET_KEY;
  
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
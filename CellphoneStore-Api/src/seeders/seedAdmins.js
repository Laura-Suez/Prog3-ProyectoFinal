import bcrypt from "bcrypt";
import { User } from "../models/User.js";

// Admins iniciales. La contraseña por defecto cumple la política
// (mínimo 8 caracteres, una mayúscula y un número) y se puede sobreescribir
// con la variable de entorno ADMIN_DEFAULT_PASSWORD.
const ADMIN_EMAILS = [
  "admin1@cellphone.com",
  "admin2@cellphone.com",
  "admin3@cellphone.com",
];

export const seedAdmins = async () => {
  const plainPassword = process.env.ADMIN_DEFAULT_PASSWORD || "Admin1234";

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  const admins = ADMIN_EMAILS.map((email) => ({
    email,
    password: hashedPassword,
    role: "admin",
    active: true,
  }));

  // updateOnDuplicate: si el email ya existe, asciende el rol a admin
  // (sin pisar la contraseña ni el estado). Si no existe, lo crea.
  await User.bulkCreate(admins, { updateOnDuplicate: ["role"] });

  console.log("Admins sembrados (o ascendidos si ya existían).");
};

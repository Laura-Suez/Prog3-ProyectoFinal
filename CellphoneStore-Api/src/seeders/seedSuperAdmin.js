import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const seedSuperAdmin = async () => {
  const email = "admin@cellphone.com";
  const plainPassword = "SuperAdmin2025";

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    console.log("El super-admin ya existe, se omite.");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  await User.create({
    email,
    password: hashedPassword,
    role: "super-admin",
    active: true,
  });

  console.log("Super-admin creado correctamente.");
};

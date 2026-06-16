import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const seedSuperAdmin = async () => {
  const adminEmail = process.env.SUPER_ADMIN_EMAIL;
  const adminPassword = process.env.SUPER_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "Faltan variables de entorno: SUPER_ADMIN_EMAIL y SUPER_ADMIN_PASSWORD",
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  // updateOnDuplicate: si el email ya existe, asciende el rol a super-admin
  // (sin pisar la contraseña ni el estado). Si no existe, lo crea.
  await User.bulkCreate(
    [
      {
        email: adminEmail,
        password: hashedPassword,
        role: "super-admin",
        active: true,
      },
    ],
    { updateOnDuplicate: ["role"] },
  );

  console.log("Super-admin sembrado (o ascendido si ya existía).");
};

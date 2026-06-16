import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { sequelize } from "../db.js";
import { seedProducts } from "./seedProducts.js";
import { seedSuperAdmin } from "./seedSuperAdmin.js";
import { seedAdmins } from "./seedAdmins.js";

dotenv.config();

// Corre todos los seeders. Es idempotente (ignoreDuplicates), así que se
// puede ejecutar en cada arranque del servidor sin generar duplicados.
export const runSeeders = async () => {
  await seedProducts();
  await seedSuperAdmin();
  await seedAdmins();
  console.log("Seeders completados.");
};

// Permite correrlo standalone: `node src/seeders/seed.js`
const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Conexión establecida. Corriendo seeders...\n");
    await runSeeders();
    process.exit(0);
  } catch (error) {
    console.error("Error al correr los seeders:", error);
    process.exit(1);
  }
}

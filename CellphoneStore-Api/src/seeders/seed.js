import { sequelize } from "../db.js";
import { seedProducts } from "./seedProducts.js";

const runSeeders = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida. Corriendo seeders...\n");

    await seedProducts();

    console.log("\n Todos los seeders corrieron exitosamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error al correr los seeders:", error);
    process.exit(1);
  }
};

runSeeders();

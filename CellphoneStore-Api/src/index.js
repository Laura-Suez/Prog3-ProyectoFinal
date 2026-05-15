import express from "express";
import { PORT } from "./config.js";
import productsRoutes from "./routes/productsRoutes.js";
import { sequelize } from "./db.js";
import { User, Product, Order } from "./models/models.js"

const app = express();


try {
    app.use(express.json());
    app.listen(PORT);
    app.use(productsRoutes);


    await sequelize.sync();
    
    console.log(`Server listening on port ${PORT}`);


} catch (error) {
    console.log(`There was an error on inizialitation`);
}

    
    



    






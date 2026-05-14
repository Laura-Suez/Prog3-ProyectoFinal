import express from "express";
import { PORT } from "./config.js";
import productsRoutes from "./routes/productsRoutes.js";
import { sequelize } from "./db.js";
import models from "./models/models.js"
// importar las 3 tablas ??? 
// impoportar {user product order} from ... o impo
// import "./models/models.js"

const app = express();

try {
    app.listen(PORT);
    app.use(productsRoutes);


    await sequelize.sync();
    
    console.log(`Server listening on port ${PORT}`);


} catch (error) {
    console.log(`There was an error on inizialitation`);
}

    
    



    






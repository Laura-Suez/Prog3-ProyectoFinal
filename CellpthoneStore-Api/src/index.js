import express from "express";
import { PORT } from "./config.js";
import cellphonesRoutes from "./routes/cellphones.routes.js";

const app = express();

app.listen(PORT);
app.use(cellphonesRoutes);
console.log(`Server listening on port ${PORT}`);

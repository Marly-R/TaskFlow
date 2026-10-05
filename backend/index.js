import express from "express";
import tareasRoutes from "./routes/tareas.routes.js";

const app = express();

app.use(express.json());

app.use("/tareas", tareasRoutes);

app.listen(3000, () => {
    console.log("Servidor Express ejecutándose en http://localhost:3000");
});
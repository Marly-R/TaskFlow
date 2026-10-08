import express from "express";
import cors from "cors";
import tareasRoutes from "./routes/tareas.routes.js";
import authRoutes from "./auth/auth.routes.js";
import perfilRoutes from "./auth/perfil.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tareas", tareasRoutes);
app.use("/auth", authRoutes);
app.use("/perfil", perfilRoutes);

app.listen(3000, () => {
    console.log("Servidor Express ejecutándose en http://localhost:3000");
});
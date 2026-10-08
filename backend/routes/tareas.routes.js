import express from "express";
import { verificarToken } from "../middleware/auth.middleware.js";

import { obtenerTareas, crearTarea, obtenerTareaPorId, actualizarTarea, eliminarTarea } from "../controllers/tareas.controller.js";

const router = express.Router();

router.get("/", verificarToken, obtenerTareas);

router.post("/", verificarToken, crearTarea);

router.get("/:id", verificarToken, obtenerTareaPorId);

router.put("/:id", verificarToken, actualizarTarea);

router.delete("/:id", verificarToken, eliminarTarea);

export default router;
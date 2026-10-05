import express from "express";

import { obtenerTareas, crearTarea, obtenerTareaPorId, actualizarTarea, eliminarTarea } from "../controllers/tareas.controller.js";

const router = express.Router();

router.get("/", obtenerTareas);

router.post("/", crearTarea);

router.get("/:id", obtenerTareaPorId);

router.put("/:id", actualizarTarea);

router.delete("/:id", eliminarTarea);

export default router;
import express from "express";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verificarToken, (req, res) => {

    res.json({
        mensaje: "Acceso autorizado",
        usuario: req.usuario
    });

});

export default router;
import pool from "../db.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {

    const { correo, password } = req.body;

    try {

        const [usuarios] = await pool.query(
            "SELECT * FROM usuarios WHERE correo = ? AND password = ?",
            [correo, password]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const usuario = usuarios[0];

        const token = jwt.sign(
            {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo
            },
            "clave-secreta-taskflow",
            {
                expiresIn: "1h"
            }
        );

        res.json({
            mensaje: "Login correcto",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo
            },
            token: token
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error en el servidor"
        });
    }
};
import conexion from "../db.js";

export const obtenerTareas = async (peticion, respuesta) => {

    try {

        const [tareas] = await conexion.query(
            "SELECT * FROM tareas WHERE usuario_id = ?",
            [peticion.usuario.id]
        );

        respuesta.json(tareas);

    } catch (error) {

        console.error("Error al obtener tareas:", error.message);

        respuesta.status(500).json({
            error: "Error al obtener las tareas"
        });

    }
};

export const crearTarea = async (peticion, respuesta) => {

    const { titulo, prioridad } = peticion.body;

    if (!titulo) {
        return respuesta.status(400).json({
            error: "El título es obligatorio"
        });
    }

    const prioridadesValidas = ["alta", "media", "baja"];

    if (!prioridadesValidas.includes(prioridad)) {
        return respuesta.status(400).json({
            error: "La prioridad debe ser alta, media o baja"
        });
    }

    try {

        const [resultado] = await conexion.query(
            "INSERT INTO tareas (titulo, prioridad, usuario_id) VALUES (?, ?, ?)",
            [titulo, prioridad, peticion.usuario.id]
        );

        respuesta.status(201).json({
            mensaje: "Tarea creada correctamente",
            tarea: {
                id: resultado.insertId,
                titulo: titulo,
                prioridad: prioridad
            }
        });

    } catch (error) {

        console.error("Error al crear tarea:", error.message);

        respuesta.status(500).json({
            error: "Error al crear la tarea"
        });

    }

};

export const actualizarTarea = async (peticion, respuesta) => {

    const id = Number(peticion.params.id);

    const { titulo, prioridad } = peticion.body;

    if (!titulo) {
        return respuesta.status(400).json({
            error: "El título es obligatorio"
        });
    }

    const prioridadesValidas = ["alta", "media", "baja"];

    if (!prioridadesValidas.includes(prioridad)) {
        return respuesta.status(400).json({
            error: "La prioridad debe ser alta, media o baja"
        });
    }

    try {

        const [resultado] = await conexion.query(
            "UPDATE tareas SET titulo = ?, prioridad = ? WHERE id = ? AND usuario_id = ?",
            [titulo, prioridad, id, peticion.usuario.id]
        );

        if (resultado.affectedRows === 0) {
            return respuesta.status(404).json({
                error: "Tarea no encontrada"
            });
        }

        respuesta.json({
            mensaje: "Tarea actualizada correctamente",
            tarea: {
                id: id,
                titulo: titulo,
                prioridad: prioridad
            }
        });

    } catch (error) {

        console.error("Error al actualizar tarea:", error.message);

        respuesta.status(500).json({
            error: "Error al actualizar la tarea"
        });

    }
};

export const eliminarTarea = async (peticion, respuesta) => {

    const id = Number(peticion.params.id);

    try {

        const [resultado] = await conexion.query(
            "DELETE FROM tareas WHERE id = ? AND usuario_id = ?",
            [id, peticion.usuario.id]
        );

        if (resultado.affectedRows === 0) {
            return respuesta.status(404).json({
                error: "Tarea no encontrada"
            });
        }

        respuesta.json({
            mensaje: "Tarea eliminada correctamente",
            id: id
        });

    } catch (error) {

        console.error("Error al eliminar tarea:", error.message);

        respuesta.status(500).json({
            error: "Error al eliminar la tarea"
        });

    }
};

export const obtenerTareaPorId = async (peticion, respuesta) => {

    const id = Number(peticion.params.id);

    try {

        const [tareas] = await conexion.query(
            "SELECT * FROM tareas WHERE id = ?",
            [id]
        );

        if (tareas.length === 0) {
            return respuesta.status(404).json({
                error: "Tarea no encontrada"
            });
        }

        respuesta.json(tareas[0]);

    } catch (error) {

        console.error("Error al obtener tarea:", error.message);

        respuesta.status(500).json({
            error: "Error al obtener la tarea"
        });

    }

};
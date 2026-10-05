export const tareas = [];

export let siguienteId = 1;

export const obtenerTareas = (peticion, respuesta) => {
    respuesta.json(tareas);
};

export const crearTarea = (peticion, respuesta) => {

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

    const nuevaTarea = {
        id: siguienteId,
        titulo: titulo,
        prioridad: prioridad
    };

    tareas.push(nuevaTarea);

    siguienteId++;

    respuesta.status(201).json({
        mensaje: "Tarea creada correctamente",
        tarea: nuevaTarea
    });
};

export const obtenerTareaPorId = (peticion, respuesta) => {

    const id = Number(peticion.params.id);

    const tarea = tareas.find(tarea => tarea.id === id);

    if (!tarea) {
        return respuesta.status(404).json({
            error: "Tarea no encontrada"
        });
    }

    respuesta.json(tarea);
};

export const actualizarTarea = (peticion, respuesta) => {

    const id = Number(peticion.params.id);

    const tarea = tareas.find(tarea => tarea.id === id);

    if (!tarea) {
        return respuesta.status(404).json({
            error: "Tarea no encontrada"
        });
    }

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

    tarea.titulo = titulo;
    tarea.prioridad = prioridad;

    respuesta.json({
        mensaje: "Tarea actualizada correctamente",
        tarea: tarea
    });
};

export const eliminarTarea = (peticion, respuesta) => {

    const id = Number(peticion.params.id);

    const indice = tareas.findIndex(tarea => tarea.id === id);

    if (indice === -1) {
        return respuesta.status(404).json({
            error: "Tarea no encontrada"
        });
    }

    const tareaEliminada = tareas.splice(indice, 1);

    respuesta.json({
        mensaje: "Tarea eliminada correctamente",
        tarea: tareaEliminada[0]
    });
};
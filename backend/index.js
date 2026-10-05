import express from "express";

const app = express();

app.use(express.json());

const tareas = [];

let siguienteId = 1;

app.get("/", (peticion, respuesta) => {
    respuesta.send("TaskFlow API funcionando con Express");
});

app.get("/tareas", (peticion, respuesta) => {
    respuesta.json(tareas);
});

app.get("/tareas/:id", (peticion, respuesta) => {

    const id = Number(peticion.params.id);

    const tarea = tareas.find(tarea => tarea.id === id);

    if (!tarea) {
        return respuesta.status(404).json({
            error: "Tarea no encontrada"
        });
    }

    respuesta.json(tarea);
});

app.post("/tareas", (peticion, respuesta) => {

    const nuevaTarea = {
        id: siguienteId,
        titulo: peticion.body.titulo,
        prioridad: peticion.body.prioridad
    };

    tareas.push(nuevaTarea);

    siguienteId++;

    respuesta.status(201).json({
        mensaje: "Tarea creada correctamente",
        tarea: nuevaTarea
    });

});

app.put("/tareas/:id", (peticion, respuesta) => {

    const id = Number(peticion.params.id);

    const tarea = tareas.find(tarea => tarea.id === id);

    if (!tarea) {
        return respuesta.status(404).json({
            error: "Tarea no encontrada"
        });
    }

    tarea.titulo = peticion.body.titulo;
    tarea.prioridad = peticion.body.prioridad;

    respuesta.json({
        mensaje: "Tarea actualizada correctamente",
        tarea: tarea
    });

});

app.delete("/tareas/:id", (peticion, respuesta) => {

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

});

app.listen(3000, () => {
    console.log("Servidor Express ejecutándose en http://localhost:3000");
});
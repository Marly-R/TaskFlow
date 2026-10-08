import { useState } from "react";

function TaskForm({ onTareaCreada }) {

    const [titulo, setTitulo] = useState("");
    const [prioridad, setPrioridad] = useState("media");

    const crearTarea = async () => {

        console.log("Botón presionado");

        const token = localStorage.getItem("token");

const respuesta = await fetch("http://localhost:3000/tareas", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
        titulo,
        prioridad
    })
});

        const datos = await respuesta.json();

        console.log(datos);

        onTareaCreada();
    };

    return (
        <div>
            <h2>Nueva tarea</h2>

            <input
                type="text"
                placeholder="Escribe una tarea"
                value={titulo}
                onChange={(evento) => setTitulo(evento.target.value)}
            />

            <select
                value={prioridad}
                onChange={(evento) => setPrioridad(evento.target.value)}
            >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>

            <button onClick={crearTarea}>
                Crear tarea
            </button>

            <p>Tarea: {titulo}</p>
            <p>Prioridad: {prioridad}</p>
        </div>
    );
}

export default TaskForm;
import { useState } from "react";

function TaskList({ tareas, onTareaActualizada }) {

    const [tareaEditando, setTareaEditando] = useState(null);

    const eliminarTarea = async (id) => {

        const token = localStorage.getItem("token");

        await fetch(`http://localhost:3000/tareas/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        onTareaActualizada();
    };

    const actualizarTarea = async (id, titulo, prioridad) => {

        const token = localStorage.getItem("token");

        const respuesta = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                titulo,
                prioridad
            })
        });

        if (respuesta.ok) {
            setTareaEditando(null);
            onTareaActualizada();
        }
    };

    return (
        <div>
            <h2>Mis tareas</h2>

            {tareas.map((tarea) => (
                <div key={tarea.id}>

                    <h3>{tarea.titulo}</h3>
                    <p>Prioridad: {tarea.prioridad}</p>
                    <p>Estado: Pendiente</p>

                    <button onClick={() => setTareaEditando(tarea)}>
                        Editar
                    </button>

                    <button onClick={() => eliminarTarea(tarea.id)}>
                        Eliminar
                    </button>

                    {tareaEditando?.id === tarea.id && (
                        <div>

                            <input
                                type="text"
                                value={tareaEditando.titulo}
                                onChange={(e) =>
                                    setTareaEditando({
                                        ...tareaEditando,
                                        titulo: e.target.value
                                    })
                                }
                            />

                            <select
                                value={tareaEditando.prioridad}
                                onChange={(e) =>
                                    setTareaEditando({
                                        ...tareaEditando,
                                        prioridad: e.target.value
                                    })
                                }
                            >
                                <option value="alta">Alta</option>
                                <option value="media">Media</option>
                                <option value="baja">Baja</option>
                            </select>

                            <button
                                onClick={() =>
                                    actualizarTarea(
                                        tarea.id,
                                        tareaEditando.titulo,
                                        tareaEditando.prioridad
                                    )
                                }
                            >
                                Guardar cambios
                            </button>

                            <button onClick={() => setTareaEditando(null)}>
                                Cancelar
                            </button>

                        </div>
                    )}

                </div>
            ))}
        </div>
    );
}

export default TaskList;

import { useState } from "react";

function TaskList({ tareas, onTareaActualizada }) {
    const [tareaEditando, setTareaEditando] = useState(null);

    const obtenerToken = () => localStorage.getItem("token");

    const eliminarTarea = async (id) => {
        const token = obtenerToken();

        const respuesta = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (respuesta.ok) {
            onTareaActualizada();
        } else {
            alert("No se pudo eliminar la tarea.");
        }
    };


    const actualizarTarea = async (id, titulo, prioridad, estado, descripcion = "") => {
        const token = localStorage.getItem("token");

        const respuesta = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ titulo, prioridad, estado, descripcion })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            setTareaEditando(null);
            onTareaActualizada();
        } else {
            alert(datos.error || "No se pudo actualizar la tarea.");
        }
    };


    const cambiarEstado = async (tarea, nuevoEstado) => {
        await actualizarTarea(
            tarea.id,
            tarea.titulo,
            tarea.prioridad,
            nuevoEstado,
            tarea.descripcion || ""
        );
    };

    const nombreEstado = (estado) => {
        const estados = {
            pendiente: "Pendiente",
            en_proceso: "En proceso",
            completada: "Completada"
        };

        return estados[estado] || "Pendiente";
    };

    return (
        <div className="task-list">
            <h2>Mis tareas</h2>

            {tareas.length === 0 ? (
                <p>Aún no tienes tareas registradas.</p>
            ) : (
                tareas.map((tarea) => (
                    <div className="task-item" key={tarea.id}>
                        {tareaEditando?.id === tarea.id ? (
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

                                <select
                                    value={tareaEditando.estado}
                                    onChange={(e) =>
                                        setTareaEditando({
                                            ...tareaEditando,
                                            estado: e.target.value
                                        })
                                    }
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="en_proceso">En proceso</option>
                                    <option value="completada">Completada</option>
                                </select>


                                <button
                                    onClick={() =>
                                        actualizarTarea(
                                            tarea.id,
                                            tareaEditando.titulo,
                                            tareaEditando.prioridad,
                                            tareaEditando.estado,
                                            tareaEditando.descripcion || ""
                                        )
                                    }
                                >
                                    Guardar cambios
                                </button>


                                <button onClick={() => setTareaEditando(null)}>
                                    Cancelar
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3>{tarea.titulo}</h3>
                                <p>Prioridad: {tarea.prioridad}</p>

                                <label>
                                    Estado:{" "}
                                    <select
                                        value={tarea.estado || "pendiente"}
                                        onChange={(e) =>
                                            cambiarEstado(tarea, e.target.value)
                                        }
                                    >
                                        <option value="pendiente">Pendiente</option>
                                        <option value="en_proceso">En proceso</option>
                                        <option value="completada">Completada</option>
                                    </select>
                                </label>

                                <p>Progreso: {nombreEstado(tarea.estado)}</p>

                                <button onClick={() => setTareaEditando(tarea)}>
                                    Editar
                                </button>

                                <button onClick={() => eliminarTarea(tarea.id)}>
                                    Eliminar
                                </button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default TaskList;

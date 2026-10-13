import { useState } from "react";
import "./TaskForm.css";
import RichTextEditor from "./RichTextEditor";

function TaskForm({ onTareaCreada }) {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [prioridad, setPrioridad] = useState("media");

    const crearTarea = async () => {
        if (!titulo.trim()) {
            alert("Por favor, escribe el título de la tarea.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const respuesta = await fetch("http://localhost:3000/tareas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    titulo: titulo.trim(),
                    descripcion: descripcion.trim(),
                    prioridad
                })
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                alert(datos.error || datos.mensaje || "No se pudo crear la tarea.");
                return;
            }

            setTitulo("");
            setDescripcion("");
            setPrioridad("media");

            await onTareaCreada();
        } catch (error) {
            console.error("Error al crear la tarea:", error);
            alert("No se pudo conectar con el servidor.");
        }
    };

    return (
        <section className="task-form-card">
            <div className="task-form-header">
                <div className="task-form-heading">
                    <span className="task-form-eyebrow">ORGANIZA TU DÍA</span>
                    <h2>Nueva tarea</h2>
                    <p>Agrega una actividad y empieza a organizar tus pendientes.</p>
                </div>

                <div className="task-form-icon" aria-hidden="true">+</div>
            </div>

            <div className="task-form-body">
                <div className="task-form-field">
                    <label htmlFor="titulo-tarea">Nombre de la tarea</label>
                    <input
                        id="titulo-tarea"
                        className="task-form-input"
                        type="text"
                        placeholder="¿Qué necesitas hacer?"
                        value={titulo}
                        onChange={(evento) => setTitulo(evento.target.value)}
                        onKeyDown={(evento) => {
                            if (evento.key === "Enter") {
                                evento.preventDefault();
                                crearTarea();
                            }
                        }}
                    />
                </div>

                <div className="task-form-field">
                    <label htmlFor="descripcion-tarea">
                        Descripción <span className="optional-label">(opcional)</span>
                    </label>

                    <RichTextEditor
                        value={descripcion}
                        onChange={setDescripcion}
                    />
                </div>


                <div className="task-form-field">
                    <label htmlFor="prioridad-tarea">Nivel de prioridad</label>
                    <select
                        id="prioridad-tarea"
                        className="task-form-select"
                        value={prioridad}
                        onChange={(evento) => setPrioridad(evento.target.value)}
                    >
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                </div>

                <button
                    className="task-form-submit"
                    type="button"
                    onClick={crearTarea}
                >
                    <span>Crear tarea</span>
                    <span className="task-form-submit-icon" aria-hidden="true">→</span>
                </button>
            </div>
        </section>
    );
}

export default TaskForm;

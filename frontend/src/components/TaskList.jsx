function TaskList({ tareas, onTareaActualizada }) {

    const eliminarTarea = async (id) => {

        await fetch(`http://localhost:3000/tareas/${id}`, {
            method: "DELETE"
        });

        onTareaActualizada();
    };

    return (
        <div>
            <h2>Mis tareas</h2>

            {tareas.map((tarea) => (
                <div key={tarea.id}>
                    <h3>{tarea.titulo}</h3>
                    <p>Prioridad: {tarea.prioridad}</p>

                    <button onClick={() => eliminarTarea(tarea.id)}>
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TaskList;

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import "./TaskChart.css";

function TaskChart({ tareas = [] }) {
    const datos = [
        {
            nombre: "Pendientes",
            cantidad: tareas.filter(
                (tarea) => (tarea.estado || "pendiente") === "pendiente"
            ).length,
            color: "#9B1C45"
        },
        {
            nombre: "En proceso",
            cantidad: tareas.filter(
                (tarea) => tarea.estado === "en_proceso"
            ).length,
            color: "#E7A1B3"
        },
        {
            nombre: "Completadas",
            cantidad: tareas.filter(
                (tarea) => tarea.estado === "completada"
            ).length,
            color: "#6D1835"
        }
    ];

    const total = tareas.length;

    return (
        <section className="task-chart-card">
            <div className="task-chart-header">
                <div>
                    <span className="task-chart-eyebrow">
                        RESUMEN DE ACTIVIDAD
                    </span>
                    <h2>Progreso de tareas</h2>
                    <p>Consulta el estado de tus actividades.</p>
                </div>
            </div>

            {total === 0 ? (
                <div className="task-chart-empty">
                    <p>Aún no tienes tareas para mostrar.</p>
                </div>
            ) : (
                <div className="task-chart-container">
                    <div className="task-chart-graphic">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={datos}
                                    dataKey="cantidad"
                                    nameKey="nombre"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="58%"
                                    outerRadius="82%"
                                    paddingAngle={3}
                                    stroke="none"
                                >
                                    {datos.map((dato) => (
                                        <Cell
                                            key={dato.nombre}
                                            fill={dato.color}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />

                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="task-chart-center">
                            <strong>{total}</strong>
                            <span>Tareas</span>
                        </div>
                    </div>

                    <div className="task-chart-summary">
                        {datos.map((dato) => (
                            <div
                                className="task-chart-summary-item"
                                key={dato.nombre}
                            >
                                <span
                                    className="task-chart-dot"
                                    style={{ backgroundColor: dato.color }}
                                />
                                <span>{dato.nombre}</span>
                                <strong>{dato.cantidad}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default TaskChart;

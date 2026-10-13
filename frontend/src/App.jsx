import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskChart from "./components/TaskChart";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

function App() {

    const [tareas, setTareas] = useState([]);

    const [usuario, setUsuario] = useState(() => {

        const usuarioGuardado = localStorage.getItem("usuario");

        return usuarioGuardado
            ? JSON.parse(usuarioGuardado)
            : null;
    });

    const cerrarSesion = () => {

        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

        setUsuario(null);
    };

    const obtenerPerfil = async () => {

        console.log("Se ejecutó obtenerPerfil");

        const token = localStorage.getItem("token");

        console.log("Token:", token);

        const respuesta = await fetch("http://localhost:3000/perfil", {

            headers: {
                "Authorization": `Bearer ${token}`
            }

        });

        const datos = await respuesta.json();

        console.log("Respuesta del perfil:", datos);
    };

    const obtenerTareas = async () => {

        const token = localStorage.getItem("token");

        const respuesta = await fetch("http://localhost:3000/tareas", {

            headers: {
                "Authorization": `Bearer ${token}`
            }

        });

        if (respuesta.status === 401) {

            localStorage.removeItem("usuario");
            localStorage.removeItem("token");

            setUsuario(null);

            return;
        }

        const datos = await respuesta.json();

        setTareas(datos);
    };

    useEffect(() => {

        if (usuario) {

            obtenerTareas();

        } else {

            setTareas([]);

        }

    }, [usuario]);


    return (

        <div>

            {!usuario ? (

                <Login onLogin={setUsuario} />

            ) : (

                <>

                    <Navbar
                        titulo="TaskFlow"
                        onCerrarSesion={cerrarSesion}
                    />

                    <div className="app-layout">

                        <Sidebar />

                        <main className="app-content">

                            <section className="dashboard-header">

                                <div>
                                    <h1>Mis tareas</h1>

                                    <p>
                                        Organiza tus actividades y lleva el control de tu progreso.
                                    </p>
                                </div>

                                <div className="welcome-card">
                                    <span className="welcome-name">
                                        Bienvenid@, {usuario.nombre}
                                    </span>

                                    <span className="welcome-date">
                                        {new Date().toLocaleDateString("es-MX", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </span>
                                </div>

                                <button
                                    className="profile-button"
                                    onClick={obtenerPerfil}
                                >
                                    Ver perfil
                                </button>

                            </section>

                            <section className="task-counters">

                                <div className="counter-card">
                                    <img
                                        className="counter-image"
                                        src="/Total.png"
                                        alt=""
                                    />
                                    <div className="counter-info">
                                        <span className="counter-label">Total de tareas</span>
                                        <span className="counter-number">{tareas.length}</span>
                                    </div>

                                </div>

                                <div className="counter-card">
                                    <img
                                        className="counter-image"
                                        src="/Pendientes.png"
                                        alt=""
                                    />
                                    <div className="counter-info">
                                        <span className="counter-label">Pendientes</span>
                                        <span className="counter-number">
                                            {tareas.filter(
                                                (tarea) => tarea.estado !== "completada"
                                            ).length}
                                        </span>
                                    </div>

                                </div>

                                <div className="counter-card">
                                    <img
                                        className="counter-image"
                                        src="/Completadas.png"
                                        alt=""
                                    />
                                    <div className="counter-info">
                                        <span className="counter-label">Completadas</span>
                                        <span className="counter-number">
                                            {tareas.filter(
                                                (tarea) => tarea.estado === "completada"
                                            ).length}
                                        </span>
                                    </div>

                                </div>

                            </section>




                            <section className="dashboard-tasks">

                                <div className="task-creation-layout">

                                    <div className="task-form-container">
                                        <TaskForm
                                            onTareaCreada={obtenerTareas}
                                        />
                                    </div>

                                    <div className="task-chart-container-wrapper">
                                        <TaskChart tareas={tareas} />
                                    </div>

                                </div>

                                <div className="task-list-container">
                                    <TaskList
                                        tareas={tareas}
                                        onTareaActualizada={obtenerTareas}
                                    />
                                </div>

                            </section>


                        </main>

                    </div>

                </>

            )}

        </div>

    );

}

export default App;
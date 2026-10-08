import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Login from "./components/Login";

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

                    <Navbar titulo="TaskFlow" />

                    <h1>TaskFlow - Gestor de tareas</h1>

                    <p>Mi gestor de tareas</p>

                    <p>Bienvenido, {usuario.nombre}</p>

                    <button onClick={obtenerPerfil}>
                        Ver perfil
                    </button>

                    <button onClick={cerrarSesion}>
                        Cerrar sesión
                    </button>

                    <TaskForm onTareaCreada={obtenerTareas} />

                    <TaskList
                        tareas={tareas}
                        onTareaActualizada={obtenerTareas}
                    />

                </>

            )}

        </div>

    );
}

export default App;
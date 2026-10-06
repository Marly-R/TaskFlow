import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

  const [tareas, setTareas] = useState([]);

  const obtenerTareas = async () => {

    const respuesta = await fetch("http://localhost:3000/tareas");

    const datos = await respuesta.json();

    setTareas(datos);
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div>
      <Navbar titulo="TaskFlow" />

      <h1>TaskFlow - Login</h1>
      <p>Mi gestor de tareas</p>

      <TaskForm onTareaCreada={obtenerTareas} />

      <TaskList
        tareas={tareas}
        onTareaActualizada={obtenerTareas}
      />
    </div>
  );
}

export default App;
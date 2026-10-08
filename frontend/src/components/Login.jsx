import { useState } from "react";

function Login({ onLogin }) {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const iniciarSesion = async (e) => {

        e.preventDefault();

        const respuesta = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo,
                password
            })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {

            localStorage.setItem(
                "usuario",
                JSON.stringify(datos.usuario)
            );

            localStorage.setItem("token", datos.token);

            onLogin(datos.usuario);
            setError("");

        } else {

            setError(datos.mensaje);
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>

            <form onSubmit={iniciarSesion}>

                <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Iniciar sesión
                </button>

                {error && (
                    <p>{error}</p>
                )}

            </form>
        </div>
    );
}

export default Login;
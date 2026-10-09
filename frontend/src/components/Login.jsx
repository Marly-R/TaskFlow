
import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const respuesta = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ correo, password })
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
                setError(datos.mensaje || "No se pudo iniciar sesión.");
            }
        } catch {
            setError("No se pudo conectar con el servidor. Inténtalo de nuevo.");
        }
    };

    return (
        <main className="login-layout">
            <section className="login-visual">
                <img
                    className="login-main-image"
                    src="/Login.jpg"
                    alt="Ilustración de TaskFlow"
                />
            </section>

            <section className="login-panel">
                <div className="login-card">
                    <div className="login-brand">
                        <img
                            className="login-brand-logo"
                            src="/LogoGeneral.png"
                            alt="Logotipo de TaskFlow"
                        />
                        <span>Gestor de tareas</span>
                    </div>

                    <h1 className="login-heading">¡Hola de Nuevo!</h1>

                    <p className="login-description">
                        Inicia sesión y organiza tu día.
                    </p>

                    <form className="login-form" onSubmit={iniciarSesion}>
                        <div className="login-field">
                            <label htmlFor="correo">Correo electrónico</label>
                            <input
                                id="correo"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Escribe tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        {error && (
                            <p className="login-error" role="alert">
                                {error}
                            </p>
                        )}

                        <button className="login-button" type="submit">
                            Iniciar sesión
                        </button>
                    </form>

                    <div className="login-divider">
                        <span>o ingresa con</span>
                    </div>

                    <button
                        className="login-google-button"
                        type="button"
                        disabled
                        title="Inicio de sesión con Google próximamente"
                    >
                        <img src="/Googlelogo.webp" alt="" />
                        <span>Continuar con Google</span>
                        <small>Próximamente</small>
                    </button>

                    <p className="login-footer">
                        TaskFlow · Enfócate en lo importante.
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Login;

import "./Navbar.css";

function Navbar({ titulo, onCerrarSesion }) {
    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <div className="navbar-logo">
                    <img src="/LogoGeneral.png" alt="Logo de TaskFlow" />
                </div>

                <div>
                    <h2 className="navbar-title">{titulo}</h2>
                </div>
            </div>

            <div className="navbar-actions">
                <button
                    className="navbar-logout"
                    onClick={onCerrarSesion}
                >
                    Cerrar sesión
                </button>
            </div>

        </nav>
    );
}

export default Navbar;

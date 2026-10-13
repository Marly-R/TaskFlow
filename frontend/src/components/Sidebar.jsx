
import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <a href="#" className="sidebar-link active">
                    <span className="sidebar-icon">▦</span>
                    <span>Mis tareas</span>
                </a>

                <a href="#" className="sidebar-link">
                    <span className="sidebar-icon">◷</span>
                    <span>Pendientes</span>
                </a>

                <a href="#" className="sidebar-link">
                    <span className="sidebar-icon">✓</span>
                    <span>Completadas</span>
                </a>
            </nav>
        </aside>
    );
}

export default Sidebar;

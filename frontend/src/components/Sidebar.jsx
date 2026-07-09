import { NavLink } from "react-router-dom";
import {
    FaChartBar,
    FaShieldAlt,
    FaServer
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="logo">

                <h2>IDS</h2>

                <p>Dashboard</p>

            </div>

            <nav className="menu">

                <NavLink to="/">

                    <FaChartBar />

                    <span>Dashboard</span>

                </NavLink>

                <NavLink to="/logs">

                    <FaShieldAlt />

                    <span>Attack Logs</span>

                </NavLink>

                <NavLink to="/system">

                    <FaServer />

                    <span>System</span>

                </NavLink>

            </nav>

            <div className="sidebar-footer">

                Random Forest IDS

            </div>

        </aside>

    );

}

export default Sidebar;

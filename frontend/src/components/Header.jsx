import { FaBell } from "react-icons/fa";

function Header() {

    return (

        <header className="header">

            <h1>Dashboard</h1>

            <button className="notification-btn">

                <FaBell />

            </button>

        </header>

    );

}

export default Header;

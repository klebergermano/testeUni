import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { BsFillClipboardPlusFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiLogoutBoxLine } from "react-icons/ri";

import {
    FaHome,
    FaUsers,
    FaUserPlus,
    FaClipboardList,
    FaSignOutAlt
} from "react-icons/fa";

import "./nav-sidebar.scss";

function NavSidebar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    function handleLogout() {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        closeMenu();

        navigate("/login");
    }

    return (

        <aside
            id="nav-sidebar"
            className={menuOpen ? "open" : ""}
        >

            <button
                className="btn-hamburger"
                onClick={toggleMenu}
            >
                <GiHamburgerMenu />
            </button>

            <div className="nav-content">

                <div className="user-info">

                    <img
                        src={
                            user?.img_url ||
                            "https://placehold.co/80x80"
                        }
                        alt="Usuário"
                    />

                    <h3>
                        {user?.nome || "Usuário"}
                    </h3>

                    <span>
                        {user?.cargo || "Sem cargo"}
                    </span>

                </div>

                <nav id='nav-lateral'>

                    <ul>

                        <li>

                            <NavLink
                                to="/"
                                onClick={closeMenu}
                            >

                                <FaHome />

                                <span>
                                    Início
                                </span>

                            </NavLink>

                        </li>

                        <li className="menu-group">

                            <p className="nav-section">
                                Produtos
                            </p>

                            <ul className="sub-menu">

                                <li>

                                    <NavLink
                                        to='/produtos/view-produtos'
                                        onClick={closeMenu}
                                    >

                                        <FaClipboardList />

                                        <span>
                                            Listar
                                        </span>

                                    </NavLink>

                                </li>

                                <li>

                                    <NavLink
                                        to='/produtos/add-produto'
                                        onClick={closeMenu}
                                    >

                                        <BsFillClipboardPlusFill />

                                        <span>
                                            Cadastrar
                                        </span>

                                    </NavLink>

                                </li>

                            </ul>

                        </li>

                        <li className="menu-group">

                            <p className="nav-section">
                                Usuários
                            </p>

                            <ul className="sub-menu">

                                <li>

                                    <NavLink
                                        to="/users/view"
                                        onClick={closeMenu}
                                    >

                                        <FaUsers />

                                        <span>
                                            Listar
                                        </span>

                                    </NavLink>

                                </li>

                                <li>

                                    <NavLink
                                        to="/users/add"
                                        onClick={closeMenu}
                                    >

                                        <FaUserPlus />

                                        <span>
                                            Cadastrar
                                        </span>

                                    </NavLink>

                                </li>

                            </ul>

                        </li>

                    </ul>

                </nav>

                <button
                    className="btn-logout"
                    onClick={handleLogout}
                >

                    {/* <FaSignOutAlt /> */}
                    <RiLogoutBoxLine />

                    <span>
                        Sair
                    </span>

                </button>

            </div>

        </aside>

    );

}

export default NavSidebar;
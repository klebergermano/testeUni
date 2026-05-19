import { NavLink } from "react-router-dom";
// import { FaShoppingBasket } from "react-icons/fa";
import { BsFillClipboardPlusFill } from "react-icons/bs";
import {
    FaShoppingBasket,
    FaHome,
    FaBoxOpen,
    FaPlus,
    FaUsers,
    FaUserPlus,
    FaClipboardList
} from "react-icons/fa";

import "./nav-sidebar.scss";

function NavSidebar() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

        <aside id="nav-sidebar">

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

                        <NavLink to="/">

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

                                <NavLink to='/produtos/view-produtos'>

                                    <FaClipboardList />

                                    <span>
                                        Listar
                                    </span>

                                </NavLink>

                            </li>

                            <li>

                                <NavLink to='/produtos/add-produto'>
                                    {/* <FaPlus /> */}
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

                                <NavLink to="/users/view">

                                    <FaUsers />

                                    <span>
                                        Listar
                                    </span>

                                </NavLink>

                            </li>

                            <li>

                                <NavLink to="/users/add">

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

        </aside>

    );

}

export default NavSidebar;
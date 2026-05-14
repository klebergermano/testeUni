import { NavLink } from "react-router-dom";
import "./nav-sidebar.scss";

function NavSidebar() {
    return (
        <aside id="nav-sidebar">

            <div className="user-info">
                <img
                    src="https://placehold.co/80x80"
                    alt="Usuário"
                />

                <h3>João Silva</h3>
                <span>Administrador</span>
            </div>

            <nav id='nav-lateral'>
                <ul>

                    <li>
                        <NavLink to="/">
                            Início
                        </NavLink>
                    </li>

                    <li className="menu-group">

                        <p className="nav-section">
                            Produtos
                        </p>

                        <ul className="sub-menu">
                            <li>
                                <NavLink to='/produtos/view-produto'>
                                    Ver Produtos
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/produtos/add-produto'>
                                    Cadastrar Produto
                                </NavLink>
                            </li>
                        </ul>

                    </li>

                    <p className="nav-section">
                        Usuários
                    </p>

                    <li>

                        <NavLink to="/users">
                            Users
                        </NavLink>
                    </li>

                </ul>
            </nav>

        </aside>
    );
}

export default NavSidebar;
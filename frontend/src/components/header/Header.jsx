import img from '../../assets/img/logo.png'
import './header.scss'

function Header() {

    const handleLogout = () => {

        // remove dados do usuário
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // redireciona
        window.location.href = "/login";

    };

    return (

        <header>

            <div id="header-center">

                <div className="flex-item">

                    <h1>

                        <figure id="bg-logos">
                            <img
                                src={img}
                                alt="Logo"
                            />
                        </figure>

                        Gerenciador de Estoque

                    </h1>

                </div>

                <div
                    className="flex-item"
                    id="bg-nav"
                >


                </div>

            </div>

        </header>

    )

}

export default Header
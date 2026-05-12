
import img from '../../assets/img/logo.png'
import { Link } from 'react-router-dom'
import './header.scss'

function Header() {

    return (
        <>
            <header>
                <div id="header-center">

                    <div className="flex-item">

                        <h1>
                            <figure id="bg-logos">
                                <img src={img} />
                            </figure>
                            Gerenciador de Estoque</h1>


                    </div>
                    <div className="flex-item" id="bg-nav">
                        <div id="bg-login-info">


                            <li>
                                <a href="/login">Login</a>

                            </li>
                        </div>



                    </div>


                </div>



            </header>
        </>
    )

}

export default Header
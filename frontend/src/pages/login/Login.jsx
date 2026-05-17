// src/pages/Login/Login.jsx

import { useState } from "react";
import "./Login.scss";
import logo from "../../assets/img/logo.png";
import { API_URL } from "../../services/api";

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErro("");
        setLoading(true);

        try {

            const response = await fetch(
                `${API_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email,
                        senha
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.erro || "Erro ao fazer login"
                );
            }

            console.log(data);

            // salvar token
            localStorage.setItem(
                "token",
                data.accessToken
            );

            // redirecionar
            window.location.href = "/";

        } catch (error) {

            setErro(error.message);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div id="bg-login">
            <figure>
                <img
                    src={logo}
                    alt="logo nova bebidas"
                />
            </figure>

            <form className="formulario">
                <h2>Acessar:</h2>

                <div className="card-user">
                    <input
                        type="text"
                        required
                    />
                    <label>Usuário</label>
                </div>

                <div className="card-user">
                    <input
                        type="password"
                        required
                    />
                    <label>Senha</label>
                </div>

                <div>
                    <a href="#" className="forget">
                        Esqueceu a senha?
                    </a>
                </div>

                <div>
                    <button
                        type="submit"
                        className="btn-entrar"
                    >
                        Entrar
                    </button>
                </div>

                <div>
                    <hr />
                </div>
            </form>
        </div>
    );
}
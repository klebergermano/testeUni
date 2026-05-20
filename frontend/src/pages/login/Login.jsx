// src/pages/Login/Login.jsx

import { useState } from "react";
import "./Login.scss";
import logo from "../../assets/img/logo.png";
import { API_URL } from "../../services/api";

export default function Login() {

    const [email, setEmail] = useState("fulano@email.com");
    const [senha, setSenha] = useState("12345");
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
                    body: JSON.stringify({
                        email,
                        senha
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message || "Erro ao fazer login"
                );

            }

            // salva token
            localStorage.setItem(
                "token",
                data.token
            );

            // salva usuário
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // redireciona
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

            <form
                className="formulario"
                onSubmit={handleSubmit}
            >

                <h2>Acessar:</h2>

                {
                    erro && (
                        <p className="erro-login">
                            {erro}
                        </p>
                    )
                }

                <div className="card-user">

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Email</label>

                </div>

                <div className="card-user">

                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
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
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Entrando..."
                                : "Entrar"
                        }

                    </button>

                </div>

                <div>
                    <hr />
                </div>

            </form>

        </div>

    );

}
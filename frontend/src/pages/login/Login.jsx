// src/pages/Login/Login.jsx

import { useState } from "react";
import "./Login.scss";
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
        <main className="login">

            <div className="login-container">

                <h1>Painel Admin</h1>

                <p className="subtitle">
                    Faça login para continuar
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Senha</label>

                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) =>
                                setSenha(e.target.value)
                            }
                            required
                        />
                    </div>

                    {
                        erro && (
                            <div className="erro">
                                {erro}
                            </div>
                        )
                    }

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Entrando..."
                                : "Entrar"
                        }
                    </button>

                </form>

            </div>

        </main>
    );
}
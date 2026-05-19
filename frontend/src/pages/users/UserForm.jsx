// src/components/users/UserForm.jsx

import { useEffect, useState } from "react";

import { API_URL } from "../../services/api";

import "./UserForm.scss";

function UserForm({
    user = null,
    modo = "criar"
}) {

    const isEdit = modo === "editar";

    const [formData, setFormData] = useState({

        nome: "",
        email: "",
        senha: "",
        usuario: "",
        img_url: "",
        cargo: "",
        status: ""

    });

    // preenche formulário no modo edição
    useEffect(() => {

        if (!user) return;

        setFormData({

            nome: user.nome || "",
            email: user.email || "",
            usuario: user.usuario || "",
            img_url: user.img_url || "",
            cargo: user.cargo || "",
            status: user.status || "",

            // não preencher senha
            senha: ""

        });

    }, [user]);

    function handleChange(e) {

        const {
            name,
            value
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {

        e.preventDefault();

        const payload = {
            ...formData
        };

        // remove senha vazia no editar
        if (
            isEdit &&
            !payload.senha.trim()
        ) {

            delete payload.senha;
        }

        try {

            const endpoint = isEdit
                ? `${API_URL}/users/update/${user.id}`
                : `${API_URL}/users/add`;

            const method = isEdit
                ? "PUT"
                : "POST";

            const response = await fetch(
                endpoint,
                {
                    method,

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Erro ao salvar usuário"
                );
            }

            alert(
                isEdit
                    ? "Usuário atualizado!"
                    : "Usuário cadastrado!"
            );

            // limpa formulário no criar
            if (!isEdit) {

                setFormData({

                    nome: "",
                    email: "",
                    senha: "",
                    usuario: "",
                    img_url: "",
                    cargo: "",
                    status: ""

                });

            }

        } catch (error) {

            console.error(error);
            if (error.response) {
                console.error("Resposta da API:", error.response.data);
                console.error("Status:", error.response.status);
            }

            alert(
                isEdit
                    ? "Erro ao atualizar usuário"
                    : "Erro ao cadastrar usuário"
            );
        }
    }

    return (

        <div className="form-container">

            <form
                className="forms"
                onSubmit={handleSubmit}
            >

                <h2>

                    {
                        isEdit
                            ? "Editar Usuário"
                            : "Cadastrar Usuário"
                    }

                </h2>

                <div className="grid-2">

                    <div className="form-group">

                        <label>
                            Nome
                        </label>

                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>

                <div className="grid-2">

                    <div className="form-group">

                        <label>
                            Usuário
                        </label>

                        <input
                            type="text"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Cargo
                        </label>

                        <input
                            type="text"
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>

                <div className="grid-2">

                    <div className="form-group">

                        <label>
                            URL da Imagem
                        </label>

                        <input
                            type="text"
                            name="img_url"
                            value={formData.img_url}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Status
                        </label>

                        <input
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label>

                        {
                            isEdit
                                ? "Nova Senha"
                                : "Senha"
                        }

                    </label>

                    <input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required={!isEdit}
                    />

                </div>

                <button type="submit">

                    {
                        isEdit
                            ? "Salvar Alterações"
                            : "Cadastrar Usuário"
                    }

                </button>

            </form>

        </div>
    );
}

export default UserForm;
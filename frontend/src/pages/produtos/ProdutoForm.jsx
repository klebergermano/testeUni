import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";

import "./ProdutoForm.scss";

function ProdutoForm({
    produto = null,
    modo = "criar"
}) {

    const isEdit = modo === "editar";

    function formatarMoedaBR(valor) {

        valor = valor.replace(/\D/g, "");

        if (!valor) return "";

        valor = (Number(valor) / 100)
            .toFixed(2);

        return valor.replace(".", ",");
    }

    function moedaBRParaFloat(valor) {

        if (!valor) return 0;

        return parseFloat(
            valor.replace(",", ".")
        );
    }

    const [formData, setFormData] = useState({

        nome: "",
        descricao: "",
        categoria: "Refrigerante",
        marca: "",
        volume_ml: "",
        teor_alcoolico: "",

        preco_custo: "",
        preco_venda: "",

        quantidade_estoque: "",
        codigo_barras: "",
        imagem: "",
        ativo: true
    });

    // preenche formulário no modo edição
    useEffect(() => {

        if (!produto) return;

        setFormData({

            nome: produto.nome || "",
            descricao: produto.descricao || "",
            categoria: produto.categoria || "Refrigerante",
            marca: produto.marca || "",
            volume_ml: produto.volume_ml || "",
            teor_alcoolico: produto.teor_alcoolico || "",

            preco_custo: Number(produto.preco_custo || 0)
                .toFixed(2)
                .replace(".", ","),

            preco_venda: Number(produto.preco_venda || 0)
                .toFixed(2)
                .replace(".", ","),

            quantidade_estoque:
                produto.quantidade_estoque || "",

            codigo_barras:
                produto.codigo_barras || "",

            imagem: produto.imagem || "",

            ativo: produto.ativo ?? true
        });

    }, [produto]);

    function handleChange(e) {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        // formatação monetária
        if (
            ["preco_custo", "preco_venda"]
                .includes(name)
        ) {

            setFormData((prev) => ({
                ...prev,
                [name]: formatarMoedaBR(value)
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    }

    async function handleSubmit(e) {

        e.preventDefault();

        const payload = {

            ...formData,

            preco_custo:
                moedaBRParaFloat(
                    formData.preco_custo
                ),

            preco_venda:
                moedaBRParaFloat(
                    formData.preco_venda
                )
        };

        try {

            const endpoint = isEdit
                ? `${API_URL}/produtos/update/${produto.id}`
                : `${API_URL}/produtos/add`;

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
                    "Erro ao salvar produto"
                );
            }

            alert(
                isEdit
                    ? "Produto atualizado!"
                    : "Produto cadastrado!"
            );

        } catch (error) {

            console.error(error);

            alert(
                isEdit
                    ? "Erro ao atualizar produto"
                    : "Erro ao cadastrar produto"
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
                            ? "Editar Produto"
                            : "Cadastrar Produto"
                    }
                </h2>

                <div className="grid-2">

                    <div>

                        <div className="form-group">

                            <label>Nome</label>

                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Marca</label>

                            <input
                                type="text"
                                name="marca"
                                value={formData.marca}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Categoria</label>

                            <select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                            >

                                <option>Refrigerante</option>
                                <option>Suco</option>
                                <option>Água</option>
                                <option>Energético</option>
                                <option>Cerveja</option>
                                <option>Vinho</option>
                                <option>Destilado</option>
                                <option>Drink</option>
                                <option>Outro</option>

                            </select>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Descrição</label>

                        <textarea
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="grid-3">

                    <div className="form-group-2">

                        <label>Volume (ml)</label>

                        <input
                            type="number"
                            name="volume_ml"
                            value={formData.volume_ml}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group-2">

                        <label>
                            Teor Alcoólico (%)
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="teor_alcoolico"
                            value={formData.teor_alcoolico}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group-2">

                        <label>
                            Preço de Custo
                        </label>

                        <input
                            type="text"
                            name="preco_custo"
                            value={formData.preco_custo}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group-2">

                        <label>
                            Preço de Venda
                        </label>

                        <input
                            type="text"
                            name="preco_venda"
                            value={formData.preco_venda}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group-2">

                        <label>
                            Qtd. em Estoque
                        </label>

                        <input
                            type="number"
                            name="quantidade_estoque"
                            value={
                                formData.quantidade_estoque
                            }
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="grid-2">

                    <div className="form-group">

                        <label>
                            Código de Barras
                        </label>

                        <input
                            type="text"
                            name="codigo_barras"
                            value={formData.codigo_barras}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Imagem (URL)
                        </label>

                        <input
                            type="text"
                            name="imagem"
                            value={formData.imagem}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="checkbox-group">

                    <input
                        type="checkbox"
                        name="ativo"
                        checked={formData.ativo}
                        onChange={handleChange}
                    />

                    <label>
                        Produto ativo
                    </label>

                </div>

                <button type="submit">

                    {
                        isEdit
                            ? "Salvar Alterações"
                            : "Cadastrar Produto"
                    }

                </button>

            </form>

        </div>
    );
}

export default ProdutoForm;
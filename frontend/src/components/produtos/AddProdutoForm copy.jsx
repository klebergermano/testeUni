import { API_URL } from '../../services/api';

import { useState } from "react";
import "./AddProdutoForm.scss";
import helpers from '../../assets/js/helpers';

function AddProdutoForm() {
    const [formData, setFormData] = useState({
        // nome: "",
        // descricao: "",
        // categoria: "Refrigerante",
        // marca: "",
        // volume_ml: "",
        // teor_alcoolico: "",
        // preco_custo: "",
        // preco_venda: "",
        // quantidade_estoque: "",
        // codigo_barras: "",
        // imagem: "",
        // ativo: true

        nome: "Produto teste",
        descricao: "Teste de produto",
        categoria: "Refrigerante",
        marca: "Lorem Ipsum",
        volume_ml: "900",
        teor_alcoolico: "0.0",
        preco_custo: "10.00",
        preco_venda: "20.00",
        quantidade_estoque: "150",
        codigo_barras: "N.D",
        imagem: "",
        ativo: true


    });

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/produtos/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Erro ao cadastrar produto")
            }
            alert("Produto cadastrado!");
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar produto");
        }
    }

    return (
        <div className="add-produto-container">

            <form className="add-produto-form" onSubmit={handleSubmit}>

                <h2>Cadastro de Produto</h2>
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
                        <label>Teor Alcoólico (%)</label>

                        <input
                            type="number"
                            step="0.01"
                            name="teor_alcoolico"
                            value={formData.teor_alcoolico}
                            onChange={handleChange}
                        />
                    </div>



                    <div className="form-group-2">
                        <label>Preço de Custo</label>

                        <input
                            type="number"
                            step="0.01"
                            name="preco_custo"
                            value={formData.preco_custo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group-2">
                        <label>Preço de Venda</label>

                        <input
                            type="text"
                            step="0.01"
                            name="preco_venda"
                            value={formData.preco_venda}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group-2">
                        <label>Qtd. em Estoque</label>

                        <input
                            type="number"
                            name="quantidade_estoque"
                            value={formData.quantidade_estoque}
                            onChange={handleChange}
                        />
                    </div>


                </div>

                <div className="grid-2">



                    <div className="form-group">
                        <label>Código de Barras</label>

                        <input
                            type="text"
                            name="codigo_barras"
                            value={formData.codigo_barras}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Imagem (URL)</label>

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

                    <label>Produto ativo</label>
                </div>

                <button type="submit">
                    Cadastrar Produto
                </button>

            </form>

        </div>
    );
}

export default AddProdutoForm;
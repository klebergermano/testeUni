import { useState } from 'react';
import './AddProdutoForm.scss'

function AddProdutoForm() {

    const [form, setForm] = useState({
        nome: '',
        preco: '',
        categoria: '',
        estoque: ''
    });

    function handleChange(e) {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response = await fetch('http://localhost:5000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            console.log(data);

            alert('Produto cadastrado');

            setForm({
                nome: '',
                preco: '',
                categoria: '',
                estoque: ''
            });

        } catch (error) {

            console.error(error);

            alert('Erro ao cadastrar produto');

        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="produto-form"
        >

            <h2>Cadastrar Produto</h2>

            <div className="form-group">
                <label>Nome</label>

                <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Preço</label>

                <input
                    type="number"
                    step="0.01"
                    name="preco"
                    value={form.preco}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Categoria</label>

                <input
                    type="text"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Estoque</label>

                <input
                    type="number"
                    name="estoque"
                    value={form.estoque}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">
                Salvar
            </button>

        </form>

    );

}

export default AddProdutoForm;
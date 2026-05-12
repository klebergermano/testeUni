import { useEffect, useState } from 'react';
import './view-produtos.scss';

function ViewProdutoa() {

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        carregarProdutos();

    }, []);

    async function carregarProdutos() {

        try {

            const response = await fetch(
                'http://localhost:5000/produtos'
            );

            const data = await response.json();

            setProdutos(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function deletarProduto(id) {

        const confirmar = confirm(
            'Deseja remover este produto?'
        );

        if (!confirmar) return;

        try {

            await fetch(
                `http://localhost:5000/produtos/${id}`,
                {
                    method: 'DELETE'
                }
            );

            setProdutos(
                produtos.filter(
                    produto => produto.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert('Erro ao remover produto');

        }

    }

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (

        <div className="produtos-container">



            <table className="produtos-table">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        produtos.map(produto => (

                            <tr key={produto.id}>

                                <td>{produto.id}</td>

                                <td>{produto.nome}</td>

                                <td>
                                    R$ {
                                        Number(produto.preco)
                                            .toFixed(2)
                                    }
                                </td>

                                <td>{produto.categoria}</td>

                                <td>{produto.estoque}</td>

                                <td>

                                    <button
                                        className="btn-delete"
                                        onClick={() =>
                                            deletarProduto(produto.id)
                                        }
                                    >
                                        Excluir
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default ViewProdutoa;
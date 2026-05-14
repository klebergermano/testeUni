import { API_URL } from '../../services/api';

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
                `${API_URL}/produtos/view`
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
            `Deseja remover este produto? \n Essa ação não podera ser desfeita!`
        );

        if (!confirmar) return;

        try {

            const response = await fetch(
                `${API_URL}/produtos/${id}`,
                {
                    method: 'DELETE'
                }
            );
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Erro ao remover produto")

            setProdutos(
                produtos.filter(
                    produto => produto.id !== id
                )
            );

            alert('Produto removido com sucesso!');

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
                        <th>Volume ML</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
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
                                <td>{produto.volume_ml}</td>

                                <td>

                                    R$ {
                                        Number(produto.preco_venda)
                                            .toFixed(2)
                                    }
                                </td>

                                <td>{produto.categoria}
                                </td>
                                <td>
                                    <textarea>

                                        {produto.descricao}
                                    </textarea>

                                </td>

                                <td>{produto.quantidade_estoque}</td>

                                <td>
                                    {/* <button>Editar</button> */}
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
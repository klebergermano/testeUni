import { API_URL } from '../../services/api';
import helpers from '../../assets/js/helpers';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './view-produtos.scss';
import { FaEdit } from "react-icons/fa";

import { BiSolidEdit } from "react-icons/bi";


function paraValorBr(numFloat) {
    return parseFloat(numFloat).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

}

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

        <div className="bg-table">



            <table className="view-table">

                <thead>

                    <tr>
                        <th>ID</th>

                        <th>Categoria</th>

                        <th>Nome</th>
                        <th>Estoque UN</th>

                        <th>Volume ML</th>
                        <th>Preço R$</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        produtos.map(produto => (

                            <tr key={produto.id}>

                                <td className='td-id'>{produto.id}</td>

                                <td className='td-categoria'>{produto.categoria}
                                </td>
                                <td>{produto.nome}</td>
                                <td className='td-estoque'>

                                    {produto.quantidade_estoque}

                                </td>

                                <td>{produto.volume_ml}</td>

                                <td className='td-preco'>
                                    <span>{

                                        helpers.formatarDecimalBR(produto.preco_venda)


                                    }</span>
                                </td>


                                <td className='td-desc'>
                                    <textarea>

                                        {produto.descricao}
                                    </textarea>

                                </td>


                                <td className='td-action'>
                                    <Link
                                        to={`/produtos/editar/${produto.id}`}
                                        className="btn-edit"

                                    >

                                        <BiSolidEdit />
                                    </Link>

                                    <button
                                        className="btn-delete"
                                        onClick={() =>
                                            deletarProduto(produto.id)
                                        }
                                    >
                                        X
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
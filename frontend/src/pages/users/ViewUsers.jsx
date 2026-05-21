import { API_URL } from '../../services/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from "react-icons/bi";
import './ViewUsers.scss';

function ViewUsuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        carregarUsuarios();

    }, []);

    async function carregarUsuarios() {

        try {

            const response = await fetch(
                `${API_URL}/users/view`
            );

            const data = await response.json();

            setUsuarios(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function deletarUsuario(id) {

        const confirmar = confirm(
            'Deseja remover este usuário?\nEssa ação não poderá ser desfeita!'
        );

        if (!confirmar) return;

        try {

            const response = await fetch(
                `${API_URL}/users/${id}`,
                {
                    method: 'DELETE'
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Erro ao remover usuário'
                );
            }

            setUsuarios(
                usuarios.filter(
                    usuario => usuario.id !== id
                )
            );

            alert('Usuário removido com sucesso!');

        } catch (error) {

            console.error(error);

            alert('Erro ao remover usuário');

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
                        <th></th>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        {/* <th>Usuário</th> */}
                        <th>Cargo</th>
                        {/* <th>Status</th> */}
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        usuarios.map(usuario => (

                            <tr key={usuario.id}>

                                <td className='td-icon'>
                                    <figure>

                                        <img src={usuario.img_url} />

                                    </figure>
                                </td>
                                <td className='td-id'>
                                    {usuario.id}
                                </td>

                                <td>
                                    {usuario.nome}
                                </td>

                                <td>
                                    {usuario.email}
                                </td>

                                {/* <td>
                                    {usuario.usuario}
                                </td> */}

                                <td>
                                    {usuario.cargo}
                                </td>

                                {/* <td className='td-status'>

                                    {
                                        usuario.status
                                            ? 'Ativo'
                                            : 'Inativo'
                                    }

                                </td> */}

                                <td className='td-action'>

                                    <Link
                                        to={`/users/edit/${usuario.id}`}
                                        className="btn-edit"
                                    >
                                        <BiSolidEdit />
                                    </Link>

                                    <button
                                        className="btn-delete"
                                        onClick={() =>
                                            deletarUsuario(usuario.id)
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

export default ViewUsuarios;
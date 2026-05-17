import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProdutoForm from "./ProdutoForm";

import { API_URL } from "../../services/api";

function EditProduto() {

    const { id } = useParams();


    const [produto, setProduto] = useState(null);

    useEffect(() => {
        console.log('id:', id)
        async function carregarProduto() {

            try {

                const response = await fetch(
                    `${API_URL}/produtos/buscar/${id}`
                );

                const data = await response.json();

                setProduto(data);

            } catch (error) {

                console.error(error);
            }
        }

        carregarProduto();

    }, [id]);

    // loading
    if (!produto) {
        return <p>Carregando...</p>;
    }

    return (

        <ProdutoForm
            modo="editar"
            produto={produto}
        />


    );
}

export default EditProduto;
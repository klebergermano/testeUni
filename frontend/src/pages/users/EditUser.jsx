
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserForm from "./UserForm";

import { API_URL } from "../../services/api";

function EditUser() {

    const { id } = useParams();


    const [user, setUser] = useState(null);

    useEffect(() => {

        async function carregarUser() {

            try {

                const response = await fetch(
                    `${API_URL}/users/buscar/${id}`
                );

                const data = await response.json();

                setUser(data);

            } catch (error) {

                console.error(error);
            }
        }

        carregarUser();

    }, [id]);

    // loading
    if (!user) {
        return <p>Carregando...</p>;
    }

    return (

        <UserForm
            modo="editar"
            user={user}
        />


    );
}

export default EditUser;
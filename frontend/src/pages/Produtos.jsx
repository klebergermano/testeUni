import { Link } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import AddProduto from "../components/produtos/AddProduto.jsx"
import EditProduto from "../components/produtos/EditProduto.jsx"
import ViewProdutos from "../components/produtos/ViewProdutos"
function Produtos() {

    return (

        <>
            <h1 className="page-titlee">Produtos</h1>


            <Routes>
                <Route path='view-produto' element={<ViewProdutos />} />
                <Route path='add-produto' element={<AddProduto />} />
                <Route path='editar/:id' element={<EditProduto />} />

            </Routes>

        </>
    )

}
export default Produtos
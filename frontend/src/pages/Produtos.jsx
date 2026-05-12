import { Link } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import AddProdutoForm from "../components/produtos/AddProdutoForm"
import ViewProdutos from "../components/produtos/ViewProdutos"
function Produtos() {

    return (

        <>
            <h1 className="page-titlee">Produtos</h1>


            <Routes>
                <Route path='view-produto' element={<ViewProdutos />} />
                <Route path='add-produto' element={<AddProdutoForm />} />

            </Routes>

        </>
    )

}
export default Produtos
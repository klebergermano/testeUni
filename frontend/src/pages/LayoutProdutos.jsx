import { Link } from "react-router-dom"
import { Routes, Route, Outlet } from "react-router-dom"

function LayoutProdutos() {

    return (

        <div id='layout-produtos'>
            <h1 className="page-title">Produtos</h1>
            <Outlet />
        </div>
    )

}
export default LayoutProdutos
import { Link } from "react-router-dom"
import { Routes, Route, Outlet } from "react-router-dom"

function LayoutUsers() {

    return (

        <div id='layout-users'>
            <h1 className="page-title">Usuários</h1>
            <Outlet />
        </div>
    )

}
export default LayoutUsers
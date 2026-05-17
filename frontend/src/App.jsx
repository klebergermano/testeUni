import { Routes, Route } from 'react-router-dom'
import './assets/sass/index.scss'



import Home from './pages/Home'
import Dashboard from './pages/Dashboard.jsx'
import AddProduto from "./pages/produtos/AddProduto.jsx"
import EditProduto from "./pages/produtos/EditProduto.jsx"
import ViewProdutos from "./pages/produtos/ViewProdutos.jsx"

import Login from "./pages/login/Login.jsx"
import LayoutProdutos from './pages/LayoutProdutos.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
function App() {


  return (

    <Routes>
      <Route path='/login' element={<Login />} />

      <Route element={<PrivateRoute />}>

        <Route element={<Dashboard />}>
          <Route path='/' element={<Home />} />
          <Route path='/produtos' element={<LayoutProdutos />} >
            <Route index element={<ViewProdutos />} />
            <Route path='view-produtos' element={<ViewProdutos />} />
            <Route path='add-produto' element={<AddProduto />} />
            <Route path='editar/:id' element={<EditProduto />} />
          </Route>
        </Route>
      </Route>
      {/* dashboard */}
    </Routes>


  )
}

export default App

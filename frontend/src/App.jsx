import { Routes, Route } from 'react-router-dom'
import './assets/sass/index.scss'



import Home from './pages/home/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'


//----------------
import LayoutUsers from './pages/users/LayoutUsers.jsx'
import AddUser from "./pages/users/AddUser.jsx"
import EditUser from "./pages/users/EditUser.jsx"
import ViewUsers from "./pages/users/ViewUsers.jsx"

//--------------
import LayoutProdutos from './pages/LayoutProdutos.jsx'
import AddProduto from "./pages/produtos/AddProduto.jsx"
import EditProduto from "./pages/produtos/EditProduto.jsx"
import ViewProdutos from "./pages/produtos/ViewProdutos.jsx"

//----------------
import Login from "./pages/login/Login.jsx"
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

          <Route path='/users' element={<LayoutUsers />} >
            <Route index element={<ViewUsers />} />
            <Route path='view' element={<ViewUsers />} />
            <Route path='add' element={<AddUser />} />
            <Route path='edit/:id' element={<EditUser />} />
          </Route>
        </Route>
      </Route>
      {/* dashboard */}
    </Routes>


  )
}

export default App

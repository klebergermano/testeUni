import { Routes, Route } from 'react-router-dom'
import './assets/sass/index.scss'
import Footer from './components/Footer'
import Header from './components/header/Header'
import Home from './pages/Home'

import AddProduto from "./pages/produtos/AddProduto.jsx"
import EditProduto from "./pages/produtos/EditProduto.jsx"
import ViewProdutos from "./pages/produtos/ViewProdutos.jsx"


import LayoutProdutos from './pages/LayoutProdutos.jsx'
import NavSidebar from './components/navSidebar/NavSidebar';
function App() {


  return (

    <div id="app">
      <NavSidebar />

      <div id='container'>


        <Header />

        <div className='pages'>


          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/produtos' element={<LayoutProdutos />} >
              <Route index element={<ViewProdutos />} />
              <Route path='view-produtos' element={<ViewProdutos />} />
              <Route path='add-produto' element={<AddProduto />} />
              <Route path='editar/:id' element={<EditProduto />} />
            </Route>

          </Routes>

        </div>
        <Footer />

      </div>{/* container */}

    </div >
  )
}

export default App

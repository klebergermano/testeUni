import { Routes, Route } from 'react-router-dom'
import './assets/sass/index.scss'
import Footer from './components/Footer'
import Header from './components/header/Header'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
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
            <Route path='/produtos/*' element={<Produtos />} />
          </Routes>

        </div>
        <Footer />

      </div>{/* container */}

    </div >
  )
}

export default App

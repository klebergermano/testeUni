
import Footer from '../components/Footer'
import Header from '../components/header/Header'
import NavSidebar from '../components/navSidebar/NavSidebar';
import './Dashboard.scss'
import { Outlet } from 'react-router-dom';
function Dashboard() {
    return (
        <div id="app">

            <NavSidebar />

            <div id='container'>

                <Header />

                <div className='pages'>
                    <Outlet />
                </div>

                <Footer />

            </div>

        </div>
    )
}

export default Dashboard
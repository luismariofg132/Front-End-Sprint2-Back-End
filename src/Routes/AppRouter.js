import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Agente from '../components/Chat/Agente'
import Contacto from '../components/Chat/Contacto'
import LandingPage from '../components/LandingPage'
import Login from '../components/Login'
import Logout from '../components/Logout'
import NavbarP from '../components/Navbar'
import Linea from '../components/Tables/Linea'
import Marca from '../components/Tables/Marca'
import Vehiculo from '../components/Tables/Vehiculo'
import PrivateRouter from './PrivateRoutes'
import PublicRouter from './PublicRoutes'

const AppRouter = () => {

    const [checking, setchecking] = useState(true)
    const [isLogin, setIsLogin] = useState(false)

    const isAdmin = localStorage.getItem('isAdmin') || false

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                setIsLogin(true)
            }
            setchecking(false)
        })
    }, [setIsLogin, setchecking])

    if (checking) {
        return (
            <h1>Cargando... Espere</h1>
        )
    }

    return (
        <Router>
            <NavbarP />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<PublicRouter isAuthenticated={isLogin}>
                    <Login />
                </PublicRouter>} />
                <Route path="/Logout" element={<PrivateRouter isAuthenticated={isLogin}>
                    <Logout />
                </PrivateRouter>} />
                <Route path='/Marca' element={<PrivateRouter isAuthenticated={isLogin}>
                    <Marca />
                </PrivateRouter>} />
                <Route path='/Linea' element={<PrivateRouter isAuthenticated={isLogin}>
                    <Linea />
                </PrivateRouter>} />
                <Route path='/Vehiculo' element={<PrivateRouter isAuthenticated={isLogin}>
                    <Vehiculo />
                </PrivateRouter>} />
                <Route path='/Contacto' element={<Contacto />} />
                <Route path='/Agente' element={<PrivateRouter isAuthenticated={isLogin}>
                    <Agente />
                </PrivateRouter>} />

            </Routes>
        </Router>
    )
}

export default AppRouter
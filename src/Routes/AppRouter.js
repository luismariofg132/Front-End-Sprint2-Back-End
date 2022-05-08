import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from '../components/LandingPage'
import Login from '../components/Login'
import Logout from '../components/Logout'
import NavbarP from '../components/Navbar'
import PrivateRouter from './PrivateRoutes'
import PublicRouter from './PublicRoutes'

const AppRouter = () => {

    const [checking, setchecking] = useState(true)
    const [isLogin, setIsLogin] = useState(false)

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

            </Routes>
        </Router>
    )
}

export default AppRouter
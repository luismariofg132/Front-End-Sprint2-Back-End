import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from '../components/LandingPage'
import NavbarP from '../components/Navbar'

const AppRouter = () => {
    return (
        <Router>
            <NavbarP />
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </Router>
    )
}

export default AppRouter
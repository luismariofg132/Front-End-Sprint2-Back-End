import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Container, Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

const NavbarP = () => {
    const [islogin, setIslogin] = useState(false)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIslogin(true)
            } else {
                setIslogin(false)
            }
            setChecking(false)
        })
    }, [islogin])

    if (checking) {
        return (
            <h1>Cargando...</h1>
        )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Semillero SAS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Contactanos</Nav.Link>
                    </Nav>
                    <Nav>
                        {islogin &&
                            <>
                                <NavDropdown title="Opciones de Administrador" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Vehiculos</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Marcas</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Lineas</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Asesorar</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/Logout">Cerrar Sesion</Nav.Link>
                            </>
                        },
                        {!islogin &&
                            <Nav.Link href="/login">Iniciar Sesion</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavbarP
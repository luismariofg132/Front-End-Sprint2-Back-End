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
                <Navbar.Brand href="/">Semillero S.A.S</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {!islogin &&
                            <Nav.Link href="/Contacto">Contáctanos</Nav.Link>
                        }
                    </Nav>
                    <Nav>
                        {islogin &&
                            <>
                                <NavDropdown title="Opciones de administrador" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/Vehiculo">Vehículos</NavDropdown.Item>
                                    <NavDropdown.Item href="/Marca">Marcas</NavDropdown.Item>
                                    <NavDropdown.Item href="/Linea">Lineas</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/Agente">Asesorar</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/Logout">Cerrar sesión</Nav.Link>
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
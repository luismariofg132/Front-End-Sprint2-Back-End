import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const Navigate = useNavigate()

    const LogoutGoogle = () => {
        const auth = getAuth()
        signOut(auth).then(() => {
            Navigate('/')
        })
    }

    return (
        <div className='container-login'>
            <span>Logout</span>
            <Button variant="primary" onClick={LogoutGoogle}>Cerrar Sesion</Button>
        </div>
    )
}

export default Logout
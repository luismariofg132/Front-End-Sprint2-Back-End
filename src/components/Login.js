import { getAuth, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { google } from '../Firebase/FirebaseConfig'

const Login = () => {

    const Navigate = useNavigate()

    const LoginGoogle = () => {
        const auth = getAuth()
        signInWithPopup(auth, google)
            .then(({ user }) => {
                Navigate('/')
            })
    }

    return (
        <div className='container-login'>
            <span>Login</span>
            <Button variant="primary" onClick={LoginGoogle}>Google</Button>
        </div>
    )
}

export default Login
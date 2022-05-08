import { getAuth, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { Button } from 'react-bootstrap'
import { google } from '../Firebase/FirebaseConfig'

const Login = () => {

    const LoginGoogle = () => {
        const auth = getAuth()
        signInWithPopup(auth, google)
            .then(({ user }) => {
                console.log(user)
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
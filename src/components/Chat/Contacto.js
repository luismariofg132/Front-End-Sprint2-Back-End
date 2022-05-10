import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
// import socketIOClient from "socket.io-client";
// import { urlSocket } from '../../helpers/urls';

const Contacto = () => {

    // const [response, setResponse] = useState("")




    return (
        <div>
            <div className='container-chat'>
                <span>Contacto Asesor</span>
                <p>
                    It's <time dateTime={response}>{response}</time>
                </p>
            </div>
            <div className='container-input'>
                <input type="text" name='mensaje' placeholder='Mensaje' className='input-mensaje' />
                <Button variant='primary' className='btn-enviar'>Enviar</Button>
            </div>
        </div>
    )
}

export default Contacto
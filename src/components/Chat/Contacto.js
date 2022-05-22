import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import socketIOClient from "socket.io-client";
import { urlSocket } from '../../helpers/urls';
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';

const Contacto = () => {

    // Socket
    const socket = socketIOClient(urlSocket)
    const Navigate = useNavigate()

    // State para mostrar el modal
    const [values, handleInputChange, setValues] = useForm({
        nombre: "",
        email: ""
    })
    const { nombre, email } = values

    // Advisor state
    const [advisor, setAdvisor] = useState("")

    // Room state
    const [sala, setSala] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleShow()
    }, [])

    const requestRoom = () => {
        if (nombre !== "" && email !== "") {

            socket.emit("requestRoom", { nombre, email })

            // handleClose()
            socket.on("requestRoom", (data) => {
                const { room, response, adviser } = data
                if (response === "ok") {
                    setSala(room)
                    setAdvisor(adviser)
                    handleClose()
                } else if (response === "notAdviser") {
                    Swal.fire({
                        title: 'Error',
                        text: 'No tenemos un asesor disponible, intenta más tarde',
                        icon: 'warning'
                    })
                }
            })
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const redirect = () => {
        Navigate("/")
    }

    socket.on("chat:message", data => {
        showMessage(data)
    })

    const [message, handleInputChangeMessage, setValuesMessage] = useForm({
        mensaje: ""
    })

    const { mensaje } = message

    const sendMessage = () => {
        socket.emit("chat:message", { values, mensaje, sala })
    }

    const showMessage = (data) => {
        const messageHtml = document.getElementById("message")
        messageHtml.innerHTML += `
        <span><b>${data.nombre}:</b> ${data.mensaje}</span><br>
        `
    }

    return (
        <div>
            <div className='advisor-title'>Asesor: <span>{advisor}</span></div>
            <div className='container-chat'>
                <div id='message'></div>
            </div>
            <div className='container-input'>
                <input type="text" name='mensaje' onChange={handleInputChangeMessage} value={mensaje} placeholder='Mensaje' className='input-mensaje' />
                <Button variant='primary' className='btn-enviar' onClick={() => sendMessage()}>Enviar</Button>
            </div>

            <Modal show={show} onHide={redirect}>
                <Modal.Header closeButton>
                    <Modal.Title>Ingrese sus datos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Pepito Perez"
                                value={nombre}
                                onChange={handleInputChange}
                                name='nombre'
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={handleInputChange}
                                name='email'
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => redirect()}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={requestRoom}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Contacto
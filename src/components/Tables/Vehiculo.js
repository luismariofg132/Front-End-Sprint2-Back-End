import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import { Col, Form, Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

// import Swal from 'sweetalert2'
import { urlVehiculos } from '../../helpers/urls'

const Vehiculo = () => {
    const [todosVehiculos, settodosVehiculos] = useState([])
    const [fileUrl, setFileUrl] = useState([])
    const reader = new FileReader();

    const [values, handleInputChange, setValues] = useForm({
        placa: "",
        modelo: 0,
        fv_seguro: '',
        fv_tecnicomecanica: '',
        id_linea: 0,
        url_image: '',
        file: ''
    })

    const { placa, modelo, fv_seguro, fv_tecnicomecanica, id_linea, url_image, file } = values

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const getTodosVehiculos = async () => {
        const res = await fetch(urlVehiculos)
        const data = await res.json()
        settodosVehiculos(data)
    }

    const handleFileChange = (e) => {
        // const file = e.target.files[0];
        // setFileUrl(file)




        const fileByteArray = [];
        reader.readAsArrayBuffer(e.target.files[0])
        reader.onloadend = (evt) => {
            if (evt.target.readyState === FileReader.DONE) {
                const arrayBuffer = evt.target.result,
                    array = new Uint8Array(arrayBuffer);
                for (const a of array) {
                    fileByteArray.push(a);
                }
            }
        }
        setFileUrl(fileByteArray)
    }



    const lanzarModalNuevoVehiculo = () => {
        setValues({
            placa: "",
            modelo: 0,
            fv_seguro: '',
            fv_tecnicomecanica: '',
            id_linea: 0
        })
        handleShow2()
    }

    const createVehiculo = async (e) => {
        e.preventDefault()

        const valores = {
            placa,
            modelo,
            fv_seguro,
            fv_tecnicomecanica,
            id_linea,
            url_image: fileUrl
        }

        const res = await fetch(urlVehiculos, {
            method: 'POST',
            body: JSON.stringify(valores),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data)
        // if (res.status === 200) {
        //     await Swal.fire({
        //         icon: 'success',
        //         title: 'Vehiculo creado',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     handleClose2()
        //     window.location.reload()
        // } else {
        //     await Swal.fire({
        //         icon: 'error',
        //         title: 'Error al crear',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     handleClose2()
        // }
    }


    useEffect(() => {
        getTodosVehiculos()
        // getModeloMinMax()
    }, [])

    return (
        <div>
            <div className='consultas-3'>
                <span className='d-flex justify-content-between'>
                    Todos los vehiculos
                    <Button variant="dark" onClick={lanzarModalNuevoVehiculo} className='m-2'>Nuevo Vehiculo</Button>
                </span>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Vencimiento Seguro</th>
                            <th>Vencimiento Tecnicomecanica</th>
                            <th>Id Linea</th>
                            <th>Url image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todosVehiculos.map((vehiculo, index) => (
                                <tr key={index}>
                                    <td>{vehiculo.placa}</td>
                                    <td>{vehiculo.modelo}</td>
                                    <td>{vehiculo.fv_seguro}</td>
                                    <td>{vehiculo.fv_tecnicomecanica}</td>
                                    <td>{vehiculo.id_linea}</td>
                                    <td>{vehiculo.url_image}</td>
                                    <td>
                                        <Button variant="primary" >Editar</Button>{' '}
                                        <Button variant="danger" >Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Vehiculo</Modal.Title>
                </Modal.Header>
                <Form onSubmit={createVehiculo}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Placa</Form.Label>
                            <Form.Control type="text" name='placa' value={placa} onChange={handleInputChange} placeholder="Placa" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control type="number" name="modelo" value={modelo} onChange={handleInputChange} placeholder="Modelo" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Vencimiento Seguro</Form.Label>
                            <Form.Control type="date" name='fv_seguro' value={fv_seguro} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Vencimiento Tecnicomecanica</Form.Label>
                            <Form.Control type="date" name='fv_tecnicomecanica' value={fv_tecnicomecanica} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Imagen vehiculo</Form.Label>
                            <Form.Control type="file" name='url_image' value={url_image} onChange={handleFileChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Id Linea</Form.Label>
                            <Form.Control type="number" name='id_linea' value={id_linea} onChange={handleInputChange} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type='submit'>
                            Crear vehiculo
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default Vehiculo
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { urlMarcas } from '../../helpers/urls'
import Swal from 'sweetalert2'
import { Col, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useForm } from '../../hooks/useForm'

const Marca = () => {

    const [todasMarcas, settodasMarcas] = useState([])

    const [values, handleInputChange, setValues] = useForm({
        id_marca: 0,
        marca_activa: 'si',
        descripcion_marca: '',
        nombre_marca: ''
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        setValues({
            marca_activa: 'si',
            descripcion_marca: '',
            nombre_marca: ''
        })
    }

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const { marca_activa, descripcion_marca, nombre_marca, id_marca } = values

    const getMarcas = async () => {
        const res = await fetch(urlMarcas)
        const marcas = await res.json()
        settodasMarcas(marcas)
    }

    const nuevaMarca = async (e) => {
        e.preventDefault()
        console.log(values)
        const res = await fetch(urlMarcas, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            getMarcas()
            setValues({
                marca_activa: 'si',
                descripcion_marca: '',
                nombre_marca: ''
            })
            await Swal.fire({
                icon: 'success',
                title: 'Vehiculo creado',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose()
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error al crear',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const lanzarModal = (marca) => {
        setValues({
            id_marca: marca.id_marca,
            marca_activa: marca.marca_activa,
            descripcion_marca: marca.descripcion_marca,
            nombre_marca: marca.nombre_marca
        })
        handleShow2()
    }

    const actualizarMarca = async (e) => {
        e.preventDefault()
        const res = await fetch(urlMarcas + "/" + id_marca, {
            method: 'PUT',
            body: JSON.stringify({
                marca_activa, descripcion_marca, nombre_marca
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Marca actualizada',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose2()
            getMarcas()
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose2()
        }
    }

    const deleteMarca = async (id) => {
        const res = await fetch(urlMarcas + "/" + id, {
            method: 'DELETE'
        })
        if (res.status === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Marca eliminada',
                showConfirmButton: false,
                timer: 1500
            })
            getMarcas()
            handleClose2()

        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose2()
        }
    }

    useEffect(() => {
        getMarcas()
    }, [])

    return (
        <div>
            <div className='consultas2'>
                <span className='d-flex justify-content-between'>
                    Todas las marcas
                    <Button variant="dark" className='m-2' onClick={handleShow}>Nueva Marca</Button>
                </span>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Id Marca</th>
                            <th>Estado &#40;Activa&#41;</th>
                            <th>Descripcion</th>
                            <th>Nombre</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todasMarcas.map((marca, index) => (
                                <tr key={index}>
                                    <td>{marca.id_marca}</td>
                                    <td>{marca.marca_activa}</td>
                                    <td>{marca.descripcion_marca}</td>
                                    <td>{marca.nombre_marca}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => lanzarModal(marca)} >Editar</Button>{' '}
                                        <Button variant="danger" onClick={() => deleteMarca(marca.id_marca)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            {/* Modal Crear Nueva Marca */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Marca</Modal.Title>
                </Modal.Header>
                <Form onSubmit={nuevaMarca}>
                    <Modal.Body>
                        <Form.Group as={Col} controlId="formGridState" className='mb-3'>
                            <Form.Label>Activa</Form.Label>
                            <Form.Select name='marca_activa' value={marca_activa} onChange={handleInputChange}>
                                <option name='marca_activa' value="si">si</option>
                                <option name='marca_activa' value="no">no</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Ingrese la descripcion de la marca"
                                style={{ height: '150px' }}
                                name="descripcion_marca"
                                value={descripcion_marca}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name='nombre_marca' value={nombre_marca} onChange={handleInputChange} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type='submit'>
                            Crear vehiculo
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* Modal editar marca */}
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Marca</Modal.Title>
                </Modal.Header>
                <Form onSubmit={actualizarMarca}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Id Marca</Form.Label>
                            <Form.Control type="text" name='id_marca' value={id_marca} onChange={handleInputChange} readOnly />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState" className='mb-3'>
                            <Form.Label>Activa</Form.Label>
                            <Form.Select name='marca_activa' value={marca_activa} onChange={handleInputChange}>
                                <option name='marca_activa' value="si">si</option>
                                <option name='marca_activa' value="no">no</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Ingrese la descripcion de la marca"
                                style={{ height: '150px' }}
                                name="descripcion_marca"
                                value={descripcion_marca}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name='nombre_marca' value={nombre_marca} onChange={handleInputChange} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type='submit'>
                            Actualizar Vehiculo
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default Marca
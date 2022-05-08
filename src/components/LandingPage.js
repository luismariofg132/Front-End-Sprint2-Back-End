import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { urlVehiculos } from '../helpers/urls'
import Modal from 'react-bootstrap/Modal'


const LandingPage = () => {

    const [vehiculo, setVehiculo] = useState([])
    const [select, setSelect] = useState({})

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getVehiculo()
    }, [])

    const getVehiculo = async () => {
        const res = await fetch(urlVehiculos)
        const data = await res.json()
        setVehiculo(data)
    }

    const vehiculoSelect = (vehiculo) => {
        setSelect(vehiculo)
        handleShow()
    }

    const closeModal = () => {
        handleClose()
        setSelect({})
    }

    return (
        <div>
            <div className='containers-vehiculos'>
                {
                    vehiculo.map((vehiculo, index) => (
                        <div key={index} className="container-vehiculo">
                            <img src={vehiculo.url_image} className="img-landing" alt={vehiculo.placa} />
                            <span>{vehiculo.placa}</span>
                            <Button variant="dark" onClick={() => vehiculoSelect(vehiculo)}>Saber más</Button>
                        </div>
                    ))
                }
            </div>
            {/* Modal mas informacion */}

            <Modal
                show={show}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Vehiculo con placa: {select.placa}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='container-modal'>
                    <img src={select.url_image} alt={select.placa} className="img-modal" />
                    <h4>Placa: {select.placa}</h4>
                    <span>Modelo: {select.modelo}</span>
                    <span>Vencimiento Seguro: {select.fv_seguro}</span>
                    <span>Vencimiento Tecnicomecanica: {select.fv_tecnicomecanica}</span>
                    <span>Id linea: {select.id_linea}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default LandingPage
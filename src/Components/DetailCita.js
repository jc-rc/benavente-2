import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import {setDummyC} from "../Store/AppSlice"


function DetailCita() {

    const cita = useSelector((state) => state.app.viewCita)
    const dispatch = useDispatch()

    let colorBadge = ""
    switch (cita.status) {
        case "PENDIENTE":
            colorBadge = "orange"
            break;
        case "CONFIRMADA":
            colorBadge = "info"
            break;
        case "EN PROGRESO":
            colorBadge = "primary"
            break;
        case "REALIZADA":
            colorBadge = "success"
            break;
        case "NO REALIZADA":
            colorBadge = "warning"
            break;
        case "CANCELADA":
            colorBadge = "danger"
            break;

        default:
            break;
    }

    //DELETE CITA
    const handleDeleteCita = (id)=>{
        console.log(id);
        

         if (window.confirm("¿EN VERDAD DESEA ELIMINAR ESTA CITA?")) {
             fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/deleteCita?_id=${id}`,
                 { method: "DELETE" })
                 .then(alert("CITA ELIMINADA"))
                 .then(dispatch(setDummyC()))
                 .then(document.querySelector(".btn-close-cita").click())
         } else {
             alert("OPERACIÓN CANCELADA, RECARGANDO LISTADO...")
        }
    }

    const handleUpdateStatus = ()=>{

        let newStatus = document.querySelector("#status-cita").value

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/updateCitaStatus?_id=${cita._id}&status=${newStatus}`,
            { method: "PUT" })
            .then(response => response.json())
            .then(response => response ? alert("STATUS DE CITA CONSOLIDADA") : alert("ALGO SALIÓ MAL"))
            .then(document.querySelector(".btn-close-cita").click())
            .then(
                setTimeout(() => {
                    dispatch(setDummyC())
                    
                }, 500)
            )
    }
       
    return (
        <div>
             <div className="offcanvas offcanvas-end " data-bs-backdrop="static" id='offcanvas-cita'>
                <div className="offcanvas-header d-flex justify-content-end">
                    <button className="btn-close btn-close-cita" data-bs-dismiss="offcanvas"></button>
                </div>
                {cita.asunto && <div className="offcanvas-body">
                    <div className="card p-3 ">
                        <p className="h3">
                            <span className={`badge text-bg-${colorBadge}`}>{new Date(cita.fechaHoraI).toLocaleString().slice(-9,-3)}</span>
                            <i className="fa-solid fa-arrow-right mx-2"></i>
                            <span className={`badge text-bg-${colorBadge}`}>{new Date(cita.fechaHoraF).toLocaleString().slice(-9,-3)}</span>
                            </p>
                       
                        <div className=""></div>
                        <hr />
                        {/* <p className='h6'>Asunto: {cita.asunto}</p>
                        <p className='h6'>Médico: {cita.médico}</p>
                        <p className='h6 mb-3'>Consultorio: {cita.consultorio}</p> */}

                        <div className="row">
                            <dt className="col-6">Fecha:</dt>
                            <dd className="col-6 small"><span className="badge text-bg-warning">{new Date(cita.fechaHoraI).toLocaleDateString()}</span></dd>
                            <dt className="col-6">Paciente:</dt>
                            <dd className="col-6 small">{cita.paciente}</dd>

                            <dt className="col-6">Médico:</dt>
                            <dd className="col-6 small">{cita.médico}</dd>

                            <dt className="col-6">Consultorio:</dt>
                            <dd className="col-6">{cita.consultorio}</dd>

                            <dt className="col-6">Asunto:</dt>
                            <dd className="col-6 small">{cita.asunto}</dd>
                            <dt className="col-6">Status:</dt>
                            <dd className="col-6 small mb-0"><span className={`badge text-bg-${colorBadge}`}>{cita.status}</span></dd>
                        </div>
                        <hr />
                        <div className="row mb-3">
                            <div className="col-12 d-flex justify-content-evenly">
                                <select name="" id='status-cita' className='form-select'>
                                    <option hidden selected value="">Actualizar Status...</option>
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="CONFIRMADA">CONFIRMADA</option>
                                    <option value="EN PROGRESO">EN PROGRESO</option>
                                    <option value="REALIZADA">REALIZADA</option>
                                    <option value="NO REALIZADA">NO REALIZADA</option>
                                    <option value="CANCELADA">CANCELADA</option>
                                </select>
                                <button className='btn btn-outline-success' onClick={handleUpdateStatus}><i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>

                        <div className="card-footer pt-3 bg-body d-flex justify-content-evenly">
                            <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDeleteCita(cita._id)}><i className="fa-solid fa-trash me-2"></i>Borrar</button>
                            
                        </div>

                    </div>
                </div>}
            </div>

        </div>
    )
}

export default DetailCita
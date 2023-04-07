import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setDummyV, setDummyU } from '../Store/AppSlice'


function DetailVenta() {

    const venta = useSelector((state) => state.app.viewVenta)
    const dispatch = useDispatch()
    let colorText = ""
    let prefixPuntos = ""
    let colorBadge = ""

    switch (venta.status) {
        case "FACTURADA":
                colorBadge = "secondary"
               
                break;
              case "PAGADA":
                colorBadge = "success"
                
                break;
              case "CANCELADA":
                colorBadge = "danger"
                
                break;
    
        default:
            break;
    }

    switch (venta.pago) {
        case "directo":
            colorText = "success"
            prefixPuntos = "+"
            break;
        case "puntos":
            colorText = "danger"
            prefixPuntos = "-"
            break;
    
        default:
            break;
    }

    const handleUpdateStatus = (e)=>{

        let newStatus = document.querySelector("#status-venta").value

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/consolidarVenta?_id=${venta._id}&_idP=${venta._idP}&pago=${venta.pago}&status=${newStatus}&puntos=${venta.puntos}`,
            { method: "PUT" })
            .then(response => response.json())
            .then(response => response ? alert("VENTA CONSOLIDADA") : alert("ALGO SALIÓ MAL"))
            .then(document.querySelector(".btn-close-venta").click())
            .then(
                setTimeout(() => {
                    dispatch(setDummyV())
                    dispatch(setDummyU())
                }, 500)
            )
    }

    return (
        <div >
            <div className="offcanvas offcanvas-end" data-bs-backdrop="static" id='offcanvas-venta'>
                <div className="offcanvas-header d-flex justify-content-end">
                    <button className="btn-close btn-close-venta" data-bs-dismiss="offcanvas"></button>
                </div>
               { venta.status && <div className="offcanvas-body">
                    <div className="card p-3">
                        <p className="h4" style={{textTransform : "capitalize"}}>{venta.paciente.toLowerCase()}</p>
                      <hr />
                        <div className="row">
                            <dt className="col-6">Hora/Fecha:</dt>
                            <dd className="col-6"><span className='badge text-bg-warning'>{new Date(venta.fechaHora).toLocaleDateString() + " " + new Date(venta.fechaHora).toLocaleTimeString().slice(0,-3)}</span></dd>

                            <dt className="col-6">Consultorio:</dt>
                            <dd className="col-6">{venta.consultorio}</dd>

                            <dt className="col-6">Descripción:</dt>
                            <dd className="col-6 mb-0 small">{venta.desc}</dd>
                        </div>
                            <hr />
                        <div className="row">
                            <dt className="col-6">Venta:</dt>
                            <dd className="col-6">${venta.venta}</dd>

                            
                            <dt className="col-6">Método de Pago:</dt>
                            <dd className="col-6">{venta.pago}</dd>

                            <dt className="col-6">Puntos:</dt>
                            <dd className="col-6"><span className={`fw-bold text-${colorText}`}>{prefixPuntos}{venta.puntos}</span></dd>

                            <dt className="col-6">Total:</dt>
                            <dd className="col-6">${venta.total}</dd>

                            <dt className="col-6">Status:</dt>
                            <dd className="col-6 mb-3"><span className={` badge text-bg-${colorBadge}`}>{venta.status}</span></dd>

                        </div>


                       {venta.status === "FACTURADA" && <div className="card-footer bg-body pt-3 d-flex justify-content-evenly">
                            <select name="" id='status-venta'  className="form-select">
                                <option hidden selected value="">Actualizar Status...</option>
                                
                                <option value="PAGADA">PAGADA</option>
                                <option value="CANCELADA">CANCELADA</option>
                            </select>
                            <button className='btn btn-outline-success' onClick={handleUpdateStatus}><i className="fa-solid fa-arrow-right"></i></button>

                        </div>}
                        
                    </div>
                </div>}
            </div>
            
        </div>
    )
}

export default DetailVenta

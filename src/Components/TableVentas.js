import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVentas, setSTermVentas, setViewVenta, setDummyV } from '../Store/AppSlice'
import FormCreateVenta from './FormCreateVenta'

function TableVentas() {

  const dispatch = useDispatch()
  const sTermVentas = useSelector((state)=> state.app.sTermVentas)
  const dummyV = useSelector((state)=> state.app.dummyV)
  const ventas = useSelector((state) => state.app.ventas)

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getAllVentas`)
      .then(res => res.json())
      .then(res => dispatch(setVentas(res)))
  }, [dummyV])
  
  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/searchVentas?sTerm=${sTermVentas}`)
      .then(res => res.json())
      .then(res => dispatch(setVentas(res)))
  }, [sTermVentas])

  


  const handleSTerm = (e) => {
    dispatch(setSTermVentas(e.target.value))
  }

  const handleVentaDetail = (venta) => {
    dispatch(setViewVenta(venta))
  }


  return (
    <div className='ps-3'>
      <div className="row d-flex justify-content-center mb-3">
        <div className="col-md-6 col-12 d-flex">
          <div className="input-group">
            <input type="text" className='form-control' placeholder='Buscar...' onChange={handleSTerm} />
            <button className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
      </div>

      <div className="row pe-3">
        {/* La TABLA EN SÍ */}
        <div className="alert alert-light d-flex align-items-center justify-content-between mb-4">
          <div className="">
            <p className="h3 m-0">Ventas ({ventas.length})</p>
          </div>
          <div className="">
            <button className='btn btn-primary' data-bs-toggle="offcanvas" data-bs-target="#form-create-venta"><i className="fa-solid fa-plus"></i> Venta</button>
          </div>
        </div>
        <div className="col-12 d-none d-md-block">
          <div className="row px-3">
            <div className="col-2">Fecha/Hora</div>
            <div className="col">Paciente</div>
            <div className="col-1">Venta</div>
            <div className="col-1">Método</div>
            <div className="col-1">Puntos</div>
            <div className="col-1">Total</div>
            <div className="col-2">Status</div>
          </div>
        </div>
        {ventas.length > 0 && <div className="col-12 list-group px-0 v-scroll-box">

          <div className="d-none d-sm-block">
            {ventas.map((venta, key) => {
              let colorBadge = ""
              let colorText = ""
              let prefixPuntos = ""
            
              venta.pago === "directo" ? colorText = "success" : colorText = "danger"
              venta.pago === "directo" ? prefixPuntos = "+" : prefixPuntos = "-"
            
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
              let nivelColor = ""
              switch (venta.nivel) {
                case "1":
                  nivelColor = "primary"
                  break;
                case "2":
                  nivelColor = "warning"
                  break;
                case "3":
                  nivelColor = "success"
                  break;
                default:
                  break;
              }
              return (
                <div className="list-group-item list-group-item-action" key={key} data-bs-toggle="offcanvas" data-bs-target="#offcanvas-venta" onClick={() => handleVentaDetail(venta)} style={{ cursor: "pointer" }}>
                  <div className="row m-0">
                    <div className="col-2 small">{new Date(venta.fechaHora).toLocaleString().slice(0, -3)}</div>
                    <div className="col small" style={{ textTransform: "capitalize" }}><span className={` me-1 badge text-bg-${nivelColor}`}>{venta.nivel}</span> {venta.paciente.toLowerCase()} </div>
                    <div className="col-1 small text-end">${venta.venta}</div>
                    <div className="col-1 small text-end">{venta.pago}</div>
                    <div className="col-1 small text-end"><span className={`text-${colorText}`}>{prefixPuntos}{venta.puntos}</span></div>
                    <div className="col-1 small text-end">${venta.total}</div>
                    <div className="col-2 small"><span className={`badge text-bg-${colorBadge}`}>{venta.status}</span></div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="d-block d-sm-none">
            {ventas.map((venta, key)=>{
                let colorBadge = ""
                let colorText = ""
                let prefixPuntos = ""
              
                venta.pago === "directo" ? colorText = "success" : colorText = "danger"
                venta.pago === "directo" ? prefixPuntos = "+" : prefixPuntos = "-"
              
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
                let nivelColor = ""
                switch (venta.nivel) {
                  case "1":
                    nivelColor = "primary"
                    break;
                  case "2":
                    nivelColor = "warning"
                    break;
                  case "3":
                    nivelColor = "success"
                    break;
                  default:
                    break;
                }
              
              return(
                <div className="col-12 card mb-3" key={key} data-bs-toggle="offcanvas" data-bs-target="#offcanvas-venta" onClick={() => handleVentaDetail(venta)} style={{ cursor: "pointer" }}>
                  <div className="card-body">
                    <div className="row d-flex align-items-center">
                      <div className="col"><span className={`badge text-bg-${colorBadge}`}>{venta.status}</span></div>
                      <div className="col small text-end">{new Date(venta.fechaHora).toLocaleString().slice(0,-3)}</div>
                    </div>
                    <div className="row my-2">
                      <span className='fs-3 fw-bold'>${venta.total}</span>
                    </div>
                    <div className="row small">
                      <span>{venta.paciente} <span className={`badge text-bg-${nivelColor}`}>{venta.nivel}</span></span>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col">${venta.venta}</div>
                      <div className="col text-center">{venta.pago}</div>
                      <div className="col text-end"><span className={`text-${colorText}`}>{prefixPuntos}{venta.puntos} pts.</span></div>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>}


      </div>

      {/* OFFCANVAS CREATE */}
      <FormCreateVenta />
     
    </div>
  )
}

export default TableVentas
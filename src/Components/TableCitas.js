import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCitas, setMédicos, setSTermCitas, setViewCita } from '../Store/AppSlice'
import ChartCitas from './ChartCitas'
import FormCreateCita from './FormCreateCita'

function TableCitas() {

  const dispatch = useDispatch()
  const sTermCitas = useSelector((state) => state.app.sTermCitas)
  const dummyC = useSelector((state)=> state.app.dummyC)
  const dummyU = useSelector((state)=> state.app.dummyU)
  const citas = useSelector((state)=>state.app.citas)

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getAllCitas`)
    .then(res=>res.json())
    .then(res=> dispatch(setCitas(res)))
  }, [dummyC])

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/searchCitas?sTerm=${sTermCitas}`)
    .then(res=>res.json())
    .then(res=> dispatch(setCitas(res)))
  }, [sTermCitas])

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getMedicosOptions`)
    .then(res=> res.json())
    .then(res=> dispatch(setMédicos(res)))
  }, [dummyU])
  

  


  const handleSTerm = (e)=>{
    dispatch(setSTermCitas(e.target.value))
  }

  const handleCitaDetail = (cita)=>{
    dispatch(setViewCita(cita))
  }

  return (
    <div className='ps-3'>
      <div className="row d-flex justify-content-center mb-3">
        <div className="col-6 d-flex">
          <div className="input-group">
            <input type="text" className='form-control' placeholder='Buscar...' onChange={handleSTerm}/>
            <button className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
      </div>

      <div className="row ">
        {/* La TABLA EN SÍ */}
        <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
          <p className="h3 m-0">Citas ({citas.length})</p>
          <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#form-create-cita"><i className="fa-solid fa-plus"></i> Cita</button>
        </div>

          {/*NAV CALENDARIO / LISTA  */}
          <div className="col-12 mb-3">
            <div className="nav nav-pills">
              <div className="btn-group">
                <button className="btn pb-0 btn-outline-primary active" data-bs-toggle="pill" data-bs-target="#citas-calendar" onClick={()=>{document.querySelector(".fc-dayGridMonth-button").click()}}><i className="fa-solid fa-calendar-days h5 me-2"></i> Calendario</button>
                <button className="btn pb-0 btn-outline-primary" data-bs-toggle="pill" data-bs-target="#citas-lista"><i className="fa-solid fa-list h5 me-2"></i> Lista</button>
              </div>
            </div>
          </div>


        <div className="tab-content">
          <div className="tab-pane fade" id="citas-lista">
            <div className="col-12">
              <div className="row px-3">
                <div className="col-2">Fecha/Hora</div>
                <div className="col">Paciente</div>
                <div className="col">Médico</div>
                <div className="col-2">Estado</div>
            
              </div>
            </div>
                   {citas.length> 0 && <div className="col-12 list-group  v-scroll-box">
              {citas.map((cita, key)=>{
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
                return(
                  <div className="list-group-item list-group-item-action" key={key} data-bs-toggle="offcanvas" data-bs-target="#offcanvas-cita" onClick={()=>handleCitaDetail(cita)} style={{cursor: "pointer"}}>
                    <div className="row m-0">
                      <div className="col-2 small">{new Date(cita.fechaHoraI).toLocaleString().slice(0,-3)}</div>
                      <div className="col small" style={{textTransform: "capitalize"}}>{cita.paciente.toLowerCase()}</div>
                      <div className="col small">{cita.médico}</div>
                      <div className="col-2 small"><span className={`badge text-bg-${colorBadge}`}>{cita.status}</span></div>
                    </div>
                  </div>
                )
              })}
            </div>}
          </div>

          <div className="tab-pane fade show active" id="citas-calendar">
            <ChartCitas citas={citas} />
          </div>
        </div>


      </div>

      {/* OFFCANVAS CREATE */}
      <FormCreateCita />

    </div>
  )
}

export default TableCitas
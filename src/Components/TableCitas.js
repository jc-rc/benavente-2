import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCitas, setMédicos, setSTermCitas, setViewCita, setFechaClick } from '../Store/AppSlice'
import ChartCitas from './ChartCitas'
import FormCreateCita from './FormCreateCita'

function TableCitas() {

  const dispatch = useDispatch()
  const sTermCitas = useSelector((state) => state.app.sTermCitas)
  const dummyC = useSelector((state) => state.app.dummyC)
  const dummyU = useSelector((state) => state.app.dummyU)
  const citas = useSelector((state) => state.app.citas)

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getAllCitas`)
      .then(res => res.json())
      .then(res => dispatch(setCitas(res)))
  }, [dummyC])

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/searchCitas?sTerm=${sTermCitas}`)
      .then(res => res.json())
      .then(res => dispatch(setCitas(res)))
  }, [sTermCitas])

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getMedicosOptions`)
      .then(res => res.json())
      .then(res => dispatch(setMédicos(res)))
  }, [dummyU])





  const handleSTerm = (e) => {
    dispatch(setSTermCitas(e.target.value))
  }

  const handleCitaDetail = (cita) => {
    dispatch(setViewCita(cita))
  }

  return (
    <div className='ps-3'>
      <div className="row d-flex justify-content-center mb-md-3 mb-4">
        <div className="col-md-6 col-12 d-flex">
          <div className="input-group">
            <input type="text" className='form-control' placeholder='Buscar...' onChange={handleSTerm} />
            <button className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
      </div>

      <div className="row pe-3">
        {/* La TABLA EN SÍ */}
        <div className=" alert alert-light col-12 mb-4 d-flex justify-content-between align-items-center">
          <p className="h3 m-0">Citas ({citas.length})</p>
          <button className="btn btn-primary btn-create-cita" data-bs-toggle="offcanvas" data-bs-target="#form-create-cita"><i className="fa-solid fa-plus"></i> Cita</button>
        </div>

        {/*NAV CALENDARIO / LISTA  */}
        <div className="col-12 mb-3">
          <div className="nav nav-pills">
            <div className="btn-group">
              <button className="btn pb-0 btn-outline-primary active" data-bs-toggle="pill" data-bs-target="#citas-calendar" onClick={() => { document.querySelector(".fc-dayGridMonth-button").click() }}><i className="fa-solid fa-calendar-days h5 me-2"></i> Calendario</button>
              <button className="btn pb-0 btn-outline-primary" data-bs-toggle="pill" data-bs-target="#citas-lista"><i className="fa-solid fa-list h5 me-2"></i> Lista</button>
            </div>
          </div>
        </div>


        <div className="tab-content px-0">
          <div className="tab-pane fade" id="citas-lista">
            <div className="col-12 d-none d-md-block">
              <div className="row px-3">
                <div className="col-2">Fecha/Hora</div>
                <div className="col">Paciente</div>
                <div className="col">Médico</div>
                <div className="col-2">Estado</div>

              </div>
            </div>
            {citas.length > 0 && <div className="col-12 list-group px-0 v-scroll-box">
              <div className="d-none d-md-block">
                {citas.map((cita, key) => {
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
                  return (
                    <div className="list-group-item list-group-item-action" style={cita.status === "PENDIENTE" ? { borderColor: "#bc5010", borderLeft: "1px solid #bc5010" } : null} key={key} data-bs-toggle="offcanvas" data-bs-target="#offcanvas-cita" onClick={() => handleCitaDetail(cita)} >
                      <div className="row m-0" style={{ cursor: "pointer" }}>
                        <div className="col-2 small">{new Date(cita.fechaHoraI).toLocaleString().slice(0, -3)}</div>
                        <div className="col small" style={{ textTransform: "capitalize" }}>{cita.paciente.toLowerCase()}</div>
                        <div className="col small">{cita.médico}</div>
                        <div className="col-2 small"><span className={`badge text-bg-${colorBadge}`}>{cita.status}</span></div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="d-block d-md-none">
                {citas.map((c, key) => {

                  let colorBadge = ""
                  switch (c.status) {
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

                  return (
                    <div className="col-12 card mb-3" key={key}  data-bs-toggle="offcanvas" data-bs-target="#offcanvas-cita" onClick={() => handleCitaDetail(c)}>
                      <div className="card-body" style={{ cursor: "pointer" }}>
                        <div className="row d-flex align-items-center justify-content-between">
                          <div className="col">
                            <p className='fw-bold'><span className={`badge text-bg-${colorBadge}`}>{c.status}</span></p>
                          </div>
                          <div className="col text-end">
                            <p className='small'>{new Date(c.fechaHoraI).toLocaleString().slice(0, -3)}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <p className='m-0' style={{ textTransform: "capitalize" }}>{c.paciente.toLowerCase()}</p>
                          </div>
                          <div className="col-12">
                            <p className='m-0 small'>{c.médico}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
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
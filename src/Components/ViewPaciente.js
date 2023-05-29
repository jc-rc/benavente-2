import React from 'react'
import Header from './Header'
import TableUsers from "./TableUsers"
import TableCitas from "./TableCitas"
import TableVentas from "./TableVentas"
import ChartCitas from './ChartCitas'

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setCitas, setPacientes } from '../Store/AppSlice'

function ViewPaciente(props) {

  const dispatch = useDispatch()

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getAllCitas`)
      .then(res => res.json())
      .then(res => dispatch(setCitas(res)))
  }, [])

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getPacientesOptions`)
      .then(res => res.json())
      .then(res => dispatch(setPacientes(res)))
  }, [])


  const citas = useSelector((state) => state.app.citas)
  const misCitas = citas.filter(c => c.idFamilia === props.user.idFamilia)

  const pacientes = useSelector((state) => state.app.pacientes)
  const miFamilia = pacientes.filter(f => f.idFamilia === props.user.idFamilia && f.idInt !== props.user.idInt)


  let nivelColor = ""
  switch (props.user.nivelReward) {
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
    <div className=''>
      <Header user={props.user}></Header>

      <div className="row">
        <div className="col-2 border-end">
          <nav className="nav nav-pills flex-column">
            <button className="nav-link active text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-citas" onClick={() => { document.querySelector(".fc-dayGridMonth-button").click() }}>
              <i className="fa-solid fa-calendar-check h5 me-3"></i>Mis Citas</button>
            <button className="nav-link text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-users">
              <i className="fa-solid fa-address-card h5 me-3"></i>Mi Perfil</button>
            <button className="nav-link text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-ventas">
              <i className="fa-solid fa-user-group h5 me-3"></i>Mi Familia</button>
          </nav>
        </div>
        <div className="col-10">
          <div className="tab-content">
            <div className="tab-pane fade show active" id="nav-citas">
              <div className="row">
                <div className="col-12 p-3">
                <p className="h3">Familia: {props.user.idFamilia}</p>
                  <ChartCitas citas={misCitas} user={props.user} />

                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-users">
              <div className="row p-3">


                <div className="col-12 mb-3">
                  <p className='mb-3 fs-6 badge text-bg-secondary'>{props.user.idInt}</p>
                  <p className='h1 mb-3'>{props.user.nombre + " " + props.user.aPaterno + " " + props.user.aMaterno}</p>
                  <p className={`badge text-bg-${nivelColor} fs-5 me-3`}>Nivel {props.user.nivelReward}</p>
                  <p className={`badge text-bg-danger fs-5 me-3`}> {props.user.tipoSangre}</p>
                  <p className={`badge text-bg-info fs-5`}> {Number(props.user.puntos).toFixed(2)}</p>
                  {/* <button className='btn btn-outline-secondary'><i className="fa-solid fa-pencil"></i></button> */}
                </div>

                <div className="col-12 border rounded p-3 d-flex flex-column justify-content-center">
                  <p className='my-1'><i className="fa-solid fa-envelope me-2"></i> {props.user.username}</p>
                  <p className='my-1'><i className="fa-solid fa-phone me-2"></i>{props.user.tel1}</p>
                  <p className='my-1'><i className="fa-solid fa-phone me-2"></i>{props.user.tel2 || "-"}</p>
                  <p className='my-1'><i className="fa-solid fa-receipt me-2"></i>{props.user.rfc || "-"}</p>
                  <p className='my-1'><i className="fa-solid fa-cake me-2" style={{ color: "rgb(224, 82, 167)" }}></i>{new Date(props.user.fNacimiento).toLocaleDateString()}</p>
                  <p className='my-1'><i className="fa-solid fa-triangle-exclamation text-warning me-2"></i>{props.user.observaciones}</p>

                </div>


                <div className="col-12 mt-3">
                  <p className='small fst-italic'>¿Hay algún dato incorrecto? Por favor, contacte a Recepción.</p>
                </div>

              </div>
            </div>
            <div className="tab-pane fade p-3" id="nav-ventas">
              <div className="col-12">
                <p className="h3">Familia: {props.user.idFamilia}</p>
              </div>
              {
                miFamilia.map((f, key) => {
                  return (
                    <div className="row p-3 border rounded" key={key}>


                      <div className="col-6 mb-3">
                        <p className='mb-3 fs-6 badge text-bg-secondary'>{f.idInt}</p>
                        <p className='h1 mb-3'>{f.nombre + " " + f.aPaterno + " " + f.aMaterno}</p>
                        <p className={`badge text-bg-${nivelColor} fs-5 me-3`}>Nivel {f.nivelReward}</p>
                        <p className={`badge text-bg-danger fs-5 me-3`}> {f.tipoSangre}</p>
                        <p className={`badge text-bg-info fs-5`}> {Number(f.puntos).toFixed(2)}</p>
                        {/* <button className='btn btn-outline-secondary'><i className="fa-solid fa-pencil"></i></button> */}
                      </div>

                      <div className="col-6 border rounded p-3 d-flex flex-column justify-content-center">
                        <p className='my-1'><i className="fa-solid fa-envelope me-2"></i> {f.username}</p>
                        <p className='my-1'><i className="fa-solid fa-phone me-2"></i>{f.tel1}</p>
                        <p className='my-1'><i className="fa-solid fa-phone me-2"></i>{f.tel2 || "-"}</p>
                        <p className='my-1'><i className="fa-solid fa-receipt me-2"></i>{f.rfc || "-"}</p>
                        <p className='my-1'><i className="fa-solid fa-cake me-2" style={{ color: "rgb(224, 82, 167)" }}></i>{new Date(f.fNacimiento).toLocaleDateString()}</p>
                        <p className='my-1'><i className="fa-solid fa-triangle-exclamation text-warning me-2"></i>{f.observaciones}</p>

                      </div>


                      

                    </div>
                  )
                })
              }
              <div className="col-12 mt-3">
                        <p className='small fst-italic'>¿Hay algún dato incorrecto? Por favor, contacte a Recepción.</p>
                      </div>
            </div>
          </div>
        </div>

      </div>



    </div>
  )
}

export default ViewPaciente
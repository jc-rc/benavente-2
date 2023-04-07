import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPacientes, setSTermUsuarios, setViewUsuario } from "../Store/AppSlice"
import FormCreateUser from './FormCreateUser'

function TableUsers() {

  const dispatch = useDispatch()
  const sTermPacientes = useSelector((state) => state.app.sTermUsuarios)
  const dummyU = useSelector((state)=> state.app.dummyU)
  const [familias, setFamilias] = useState([])

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getPacientesOptions`)
      .then(res => res.json())
      .then(res => dispatch(setPacientes(res)))
  }, [dummyU])

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/searchUsuarios?sTerm=${sTermPacientes}`)
      .then(res => res.json())
      .then(res => dispatch(setPacientes(res)))
  }, [sTermPacientes])

  useEffect(() => {
    fetch("https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getFamiliasOptions")
    .then(res => res.json())
    .then(res=> setFamilias(res))
  }, [dummyU])
  


  const pacientes = useSelector((state) => state.app.pacientes)
  

  const handleSTerm = (e) => {
    dispatch(setSTermUsuarios(e.target.value))
  }

  const handleUserDetail = (user) => {
    dispatch(setViewUsuario(user))
  }



  return (
    <div className='ps-3'>
      <div className="row d-flex justify-content-center mb-3">
        <div className="col-6 d-flex">
          <div className="input-group me-3">
            <input type="text" className='form-control' placeholder='Buscar...' onChange={handleSTerm} />
            <button className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
          <button className='btn btn-outline-pink'><i className="fa-solid fa-cake"></i></button>
        </div>
      </div>

      <div className="row ">
        {/* La TABLA EN SÍ */}
        <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
          <p className="h3 m-0">Pacientes ({pacientes.length})</p>
          <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#form-create-user"><i className="fa-solid fa-plus"></i> Paciente</button>
        </div>
        <div className="col-12">
          <div className="row px-3">
            <div className="col-1">ID</div>
            <div className="col">Nombre</div>
            <div className="col-1">Sangre</div>
            <div className="col-1">Nivel</div>
            <div className="col-1">Puntos</div>
            <div className="col">Observaciones</div>
          </div>
        </div>
        {pacientes.length > 0 && <div className="col-12 list-group v-scroll-box">

          {pacientes.map((paciente, key) => {
            let nivelColor = ""
            switch (paciente.nivelReward) {
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
              <div className="list-group-item list-group-item-action" key={key} data-bs-toggle="offcanvas" data-bs-target="#offcanvas-user" onClick={() => handleUserDetail(paciente)} style={{ cursor: "pointer" }}>
                <div className="row m-0">
                  <div className="col-1 small">{paciente.idInt}</div>
                  <div className="col small" style={{ textTransform: "capitalize" }}>{paciente.nombre.toLowerCase()} {paciente.aPaterno.toLowerCase()} {paciente.aMaterno.toLowerCase()}</div>
                  <div className="col-1 small text-end">{paciente.tipoSangre}</div>
                  <div className="col-1 small text-end"><span className={`badge text-bg-${nivelColor}`}>{paciente.nivelReward}</span></div>
                  <div className="col-1 small text-end fw-bold">{paciente.puntos}</div>
                  <div className="col small text-truncate">{paciente.observaciones}</div>
                </div>
              </div>
            )
          })}

        </div>}


      </div>

      {/* OFFCANVAS CREATE */}
        <FormCreateUser familias={familias}/>
      

    </div>
  )
}

export default TableUsers
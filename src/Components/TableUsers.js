import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPacientes, setSTermUsuarios, setViewUsuario } from "../Store/AppSlice"
import FormCreateUser from './FormCreateUser'

function TableUsers() {

  const dispatch = useDispatch()
  const sTermPacientes = useSelector((state) => state.app.sTermUsuarios)
  const dummyU = useSelector((state) => state.app.dummyU)
  const [familias, setFamilias] = useState([])
  const [toggle, setToggle] = useState(false)

  
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
      .then(res => setFamilias(res))
  }, [dummyU])

    const pacientes = useSelector((state) => state.app.pacientes)
  const cumpleañeros = pacientes.filter(pC => new Date(pC.fNacimiento).getMonth() + 1 === new Date().getMonth() + 1)

  useEffect(() => {
    //Modificar el nivel, de acuerdo a la antiguedad  
    //aislar arreglos "Nivel2" y "Nivel3" con "filter"
    //Ciclar ambos con "forEach", realizando un updateOne de cada uno.
    var nivel2 = pacientes.filter(p => p.nivelReward !== 2 && new Date().getFullYear() - new Date(p.fRegistro).getFullYear() <= 3 && new Date().getFullYear() - new Date(p.fRegistro).getFullYear() > 0)
    var nivel3 = pacientes.filter(p => p.nivelReward !== 3 && new Date().getFullYear() - new Date(p.fRegistro).getFullYear() > 3)

    for (let i = 0; i < nivel2.length; i++) {
      fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/setAntiguedad?_id=${nivel2[i]._id}&nivel=2`, { method: "PUT" })
    }
    for (let i = 0; i < nivel3.length; i++) {
      fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/setAntiguedad?_id=${nivel3[i]._id}&nivel=3`, { method: "PUT" })
    }

  }, [])

  //EFECTO PARA INTERSECTION OBSERVER
  useEffect(() => {
    const tarjetas = document.querySelectorAll(".row-paciente");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersecting = entry.isIntersecting;
          entry.target.style.visibility = intersecting ? "visible" : "hidden";
        });
      },
      {
        root: document.querySelector(".scroll-pacientes"),
        threshold: 1
      }
    );

    tarjetas.forEach((tarjeta) => {
      observer.observe(tarjeta);
    });
  }, [pacientes]);


  const handleSTerm = (e) => {
    dispatch(setSTermUsuarios(e.target.value))
  }

  const handleUserDetail = (user) => {
    dispatch(setViewUsuario(user))
  }

  const toggleCumpleaños = () => {
    //Filter

    //Toggle
    setToggle(!toggle)
  }



  return (
    <div className='ps-3'>
      <div className=" row d-flex justify-content-center mb-3">
        <div className="col-md-6 col-12 d-flex">
          <div className="input-group me-3">
            <input type="text" className='form-control' placeholder='Buscar...' onChange={handleSTerm} />
            <button className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
          <button className='btn btn-outline-pink' onClick={toggleCumpleaños}><i className="fa-solid fa-cake"></i></button>
        </div>
      </div>

      <div className="row pe-3">
        {/* La TABLA EN SÍ */}
        <div className="alert alert-light col-12 mb-4 d-flex justify-content-between align-items-center">
          <p className="h3 m-0">{!toggle ? "Pacientes " : "Cumpleañeros del Mes "}({!toggle ? pacientes.length : cumpleañeros.length})</p>
          <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#form-create-user"><i className="fa-solid fa-plus"></i> Paciente</button>
        </div>
        <div className="col-12  d-none d-md-block">
          <div className="row px-3">
            <div className="col-1">ID</div>
            <div className="col">Nombre</div>
            <div className="col-1">Sangre</div>
            <div className="col-1">Nivel</div>
            <div className="col-1">Puntos</div>
            <div className="col">Observaciones</div>
          </div>
        </div>
        {pacientes.length > 0 && !toggle && <div className="col-12 list-group v-scroll-box scroll-pacientes px-0">

          <div className="d-none d-md-block">
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
                <div className="list-group-item list-group-item-action row-paciente" key={key} data-bs-toggle="offcanvas" data-bs-target="#offcanvas-user" onClick={() => handleUserDetail(paciente)} style={{ cursor: "pointer" }}>
                  <div className="row m-0">
                    <div className="col-1 small">{paciente.idInt}</div>
                    <div className="col small" style={{ textTransform: "capitalize" }}>{paciente.nombre.toLowerCase()} {paciente.aPaterno.toLowerCase()} {paciente.aMaterno? paciente.aMaterno.toLowerCase(): ""}</div>
                    <div className="col-1 small text-end">{paciente.tipoSangre}</div>
                    <div className="col-1 small text-end"><span className={`badge text-bg-${nivelColor}`}>{paciente.nivelReward}</span></div>
                    <div className="col-1 small text-end fw-bold">{Number(paciente.puntos).toFixed(2)}</div>
                    <div className="col small text-truncate">{paciente.observaciones}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="d-block d-md-none">
            {pacientes.map((p, key) => {
              let nivelColor = ""
              switch (p.nivelReward) {
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
                <div className="col-12 card mb-3" key={key} data-bs-toggle="offcanvas" data-bs-target="#offcanvas-user" onClick={() => handleUserDetail(p)}>
                  <div className="card-body" style={{ cursor: "pointer" }}>
                    <div className="row d-flex align-items-start justify-content-between mb-2">
                      <div className="col fw-bold">
                        {p.nombre} {p.aPaterno} {p.aMaterno}
                      </div>
                      <div className="col-3 text-end fw-bolder">
                        {p.idInt}
                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col small">
                        {p.observaciones}
                      </div>
                    </div> */}
                    <hr />
                    <div className="row d-flex align-items-center justify-content-between">
                      <div className="col"><span className="badge text-bg-danger">{p.tipoSangre}</span></div>
                      <div className="col text-center"><span className={`badge text-bg-${nivelColor}`}>Nivel {p.nivelReward}</span></div>
                      <div className="col text-end"><span className="badge text-bg-secondary">{p.puntos.toFixed(2)}</span></div>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>}

        {cumpleañeros.length > 0 && toggle && <div className="col-12 list-group v-scroll-box scroll-cumpleañeros">

          <div className="d-none d-md-block">
            {cumpleañeros.map((paciente, key) => {
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
                    <div className="col small" style={{ textTransform: "capitalize" }}> {paciente.nombre.toLowerCase()} {paciente.aPaterno.toLowerCase()} {paciente.aMaterno? paciente.aMaterno.toLowerCase(): ""} <span><i className="fa-solid fa-cake ms-2" style={{ color: "rgb(224, 82, 167)" }}></i></span></div>
                    <div className="col-1 small text-end">{paciente.tipoSangre}</div>
                    <div className="col-1 small text-end"><span className={`badge text-bg-${nivelColor}`}>{paciente.nivelReward}</span></div>
                    <div className="col-1 small text-end fw-bold">{Number(paciente.puntos).toFixed(2)}</div>
                    <div className="col small text-truncate">{paciente.observaciones}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="d-block d-md-none">
            {cumpleañeros.map((paciente, key) => {

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
                <div className="col-12 card mb-3" key={key} data-bs-toggle="offcanvas" data-bs-target="#offcanvas-user" onClick={() => handleUserDetail(paciente)}>
                  <div className="card-body" style={{ cursor: "pointer" }}>
                    <div className="row d-flex align-items-start justify-content-between mb-2">
                      <div className="col fw-bold">
                        {paciente.nombre} {paciente.aPaterno} {paciente.aMaterno}
                      </div>
                      <div className="col-3 text-end fw-bolder">
                        {paciente.idInt}
                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col small">
                        {paciente.observaciones}
                      </div>
                    </div> */}
                    <hr />
                    <div className="row d-flex align-items-center justify-content-start">
                      <div className="col"><span className="badge text-bg-danger">{paciente.tipoSangre}</span></div>
                      <div className="col text-center"><span className={`badge text-bg-${nivelColor}`}>Nivel {paciente.nivelReward}</span></div>
                      <div className="col text-end"><span className="badge text-bg-secondary">{paciente.puntos.toFixed(2)}</span></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>}


      </div>

      {/* OFFCANVAS CREATE */}
      <FormCreateUser familias={familias} />


    </div>
  )
}

export default TableUsers
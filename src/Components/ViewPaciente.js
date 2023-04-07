import React from 'react'
import Header from './Header'
import TableUsers from "./TableUsers"
import TableCitas from "./TableCitas"
import TableVentas from "./TableVentas"

function ViewPaciente(props) {
  return (
    <div className=''>
      <Header user={props.user}></Header>

      <div className="row">
        <div className="col-2 border-end">
          <nav className="nav nav-pills flex-column">
            <button className="nav-link active text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-citas">
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
                <div className="col-12">
                  {/* <TableCitas /> */}
                  Las citas filtradas por paciente. Vista lista (historial), vista Calendario
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-users">
                  <div className="row">
                    <div className="col-12">
                      {/* <TableUsers /> */}
                      La vista de detalle del perfil del paciente, (puntos, registro de ventas?) edición básica...
                    </div>
                  </div>
            </div>
            <div className="tab-pane fade" id="nav-ventas">
              <div className="row">
                <div className="col-12">
                  {/* <TableVentas /> */}
                  Lista de pacientes de la misma familia; vista de detalle; edición básica...
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    
      
    </div>
  )
}

export default ViewPaciente
import React from 'react'
import Header from './Header'
import TableUsers from "./TableUsers"
import TableCitas from "./TableCitas"
import TableVentas from "./TableVentas"
import Dashboard from './Dashboard'

function ViewRecepción(props) {
  return (
    <div className=''>
      <Header user={props.user}></Header>

      <div className="row">
        <div className="col-md-2 col-12 border-md-end ">
          <nav className="nav nav-pills flex-md-column justify-content-evenly mb-4 mb-md-0">
            <button className="nav-link active text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-citas" onClick={()=>{document.querySelector(".fc-dayGridMonth-button").click()}}>
              <i className="fa-solid fa-calendar-check h5 "></i><span className="d-md-inline d-none ms-3">Citas</span></button>
            <button className="nav-link text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-users">
              <i className="fa-solid fa-address-card h5 "></i><span className="d-md-inline d-none ms-3">Pacientes</span></button>
            <button className="nav-link text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-ventas">
              <i className="fa-solid fa-dollar-sign h5 "></i><span className="d-md-inline d-none ms-3">Ventas</span></button>
            <button className="nav-link text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-dash">
              <i className="fa-solid fa-chart-simple h5 "></i><span className="d-md-inline d-none ms-3">Dashboard</span></button>
          </nav>
        </div>
        <div className="col-md-10 col-12">
          <div className="tab-content">
            <div className="tab-pane fade show active" id="nav-citas">
              <div className="row">
                <div className="col-12">
                  <TableCitas />
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-users">
                  <div className="row">
                    <div className="col-12">
                      <TableUsers />
                    </div>
                  </div>
            </div>
            <div className="tab-pane fade" id="nav-ventas">
              <div className="row">
                <div className="col-12">
                  <TableVentas />
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-dash">
              <div className="row">
                <div className="col-12">
                  <Dashboard />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    
      
    </div>
  )
}

export default ViewRecepción
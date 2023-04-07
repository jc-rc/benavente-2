import React from 'react'
import Header from './Header'
import TableUsers from "./TableUsers"
import TableCitas from "./TableCitas"
import TableVentas from "./TableVentas"

function ViewRecepción(props) {
  return (
    <div className=''>
      <Header user={props.user}></Header>

      <div className="row">
        <div className="col-2 border-end">
          <nav className="nav nav-pills flex-column">
            <button className="nav-link active text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-citas" onClick={()=>{document.querySelector(".fc-dayGridMonth-button").click()}}>
              <i className="fa-solid fa-calendar-check h5 me-3"></i>Citas</button>
            <button className="nav-link text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-users">
              <i className="fa-solid fa-address-card h5 me-3"></i>Pacientes</button>
            <button className="nav-link text-start pb-0 mb-2" data-bs-toggle="pill" data-bs-target="#nav-ventas">
              <i className="fa-solid fa-dollar-sign h5 me-3"></i>Ventas</button>
          </nav>
        </div>
        <div className="col-10">
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
          </div>
        </div>

      </div>

    
      
    </div>
  )
}

export default ViewRecepción
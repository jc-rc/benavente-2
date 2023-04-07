import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setDummyU } from '../Store/AppSlice'


function DetailUser() {

    const usuario = useSelector((state) => state.app.viewUsuario)
    const dispatch = useDispatch()

    let nivelColor =""
            switch (usuario.nivelReward) {
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

        //DELETE USER
    const handleDeleteUser = (id)=>{
      console.log(id);
      

       if (window.confirm("¿EN VERDAD DESEA ELIMINAR ESTE USUARIO?")) {
           fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/deleteUsuario?_id=${id}`,
               { method: "DELETE" })
               .then(alert("USUARIO ELIMINADO"))
               .then(dispatch(setDummyU()))
               .then(document.querySelector(".btn-close-usuario").click())
       } else {
           alert("OPERACIÓN CANCELADA, RECARGANDO LISTADO...")
      }
  }
     

    return (
        <div>
             <div className="offcanvas offcanvas-end" data-bs-backdrop="static" id='offcanvas-user'>
                <div className="offcanvas-header d-flex justify-content-end">
                    <button className="btn-close btn-close-usuario" data-bs-dismiss="offcanvas"></button>
                </div>
                {usuario.nombre && <div className="offcanvas-body">
                    <div className="card p-3 ">
                        <p className="h5 my-1">#{usuario.idInt}</p>
                        <p className="h4 my-1" style={{textTransform : "capitalize"}}>{usuario.nombre.toLowerCase() + " " + usuario.aPaterno.toLowerCase() + " " + usuario.aMaterno.toLowerCase()} </p>
                        <p className="small my-1"><i className="fa-solid fa-envelope me-2"></i>{usuario.username}</p>
                        <div className="row">
                            <div className="col-6">
                                <p className="small my-1"><i className="fa-solid fa-phone me-2"></i>{usuario.tel1}</p>
                            </div>
                            <div className="col-6">
                                <p className="small my-1"><i className="fa-solid fa-phone me-2"></i>{usuario.tel2}</p>
                            </div>
                        </div>
                        <hr />
                        
                        <div className="row">
                            <dt className='col-6'>Tipo de Sangre:</dt>
                            <dd className='col-6'><span className="badge text-bg-danger">{usuario.tipoSangre}</span></dd>

                            <dt className='col-6'>Fecha Nacimiento:</dt>
                            <dd className='col-6'><span className="badge text-bg-pink">{new Date(usuario.fNacimiento).toLocaleDateString()}</span></dd>

                            <dt className='col-6'>Observaciones:</dt>
                            <dd className='col-6 small'>{usuario.observaciones}</dd>
                        </div>
                        <hr />
                        <div className="row">
                            <dt className='col-6'>¿Es Tutor?</dt>
                            <dd className='col-6'>{usuario.esTutor ? "Sí" : "No"}</dd>
                            <dt className='col-6'>ID Familia:</dt>
                            <dd className='col-6'>{usuario.idFamilia}</dd>
                        </div>
                        <hr />
                        <div className="row">
                            <dt className='col-6'>RFC:</dt>
                            <dd className='col-6'>{usuario.rfc}</dd>

                            <dt className='col-6'>Fecha Registro:</dt>
                            <dd className='col-6'><span className="badge text-bg-warning">{new Date(usuario.fRegistro).toLocaleDateString()}</span></dd>

                            <dt className='col-6'>Nivel Reward:</dt>
                            <dd className='col-6'><span className={`badge text-bg-${nivelColor}`}>Nivel {usuario.nivelReward}</span></dd>

                            <dt className='col-6'>Puntos:</dt>
                            <dd className='col-6 fw-bold mb-3'>{usuario.puntos}</dd>

                        </div>

                        <div className="card-footer bg-body pt-3 d-flex justify-content-evenly">
                            <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDeleteUser(usuario._id)}><i className="fa-solid fa-trash me-2"></i>Borrar</button>
                            <button className="btn btn-sm btn-outline-secondary"><i className="fa-solid fa-pencil me-2"></i>Editar</button>
                        </div>

                    </div>
                </div>}
            </div>
            
        </div>
    )
}

export default DetailUser
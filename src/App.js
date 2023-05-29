import './App.css';
import { useState } from 'react';
import ViewRecepción from './Components/ViewRecepción';
import ViewPaciente from './Components/ViewPaciente';
import DetailUser from './Components/DetailUser';
import DetailCita from './Components/DetailCita';
import DetailVenta from './Components/DetailVenta';
import FormChangePW from './Components/FormChangePW';

function App() {

  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [currentUser, setCurrentUser] = useState(null)
  const [exists, setExists] = useState(true)


  const handleSubmit = (e) => {
    e.preventDefault()

    //Enviar datos a validar
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/validateUser?username=${user.username}&password=${user.password}`)
      .then(response => response.json())
      .then(response => {
        if (response.length === 0) {
          //En caso de error; generar alerta o Toast?
          console.log("Empty!")
          setExists(false)
        } else {
          //En caso de éxito; asignar currentUser 
          setCurrentUser(response[0])
        }
      }
      )
  }

  const handleUsernameChange = (e) => {
    setUser({ ...user, username: e.target.value })
    setExists(true)
  }
  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value })
    setExists(true)
  }


  return (
    <div className="container-fluid p-3" style={{maxWidth: 1333}}>
      

      {/* LOGIN PAGE */}
      {!currentUser && <div className="container  border p-4 rounded" style={{ maxWidth: 400 }}>
        <div className="row">
          <form action="" onSubmit={handleSubmit}>
            <div className="col-12 ">
              <p className="h1 m-0"> <img src="./logoBena_80.svg" className='image-fluid' width={40} height={40} alt="" /> Benavente</p>
              <p className="small mb-3 fst-italic">Plataforma para el Control de Citas</p>
              <hr />
              
            </div>
            <div className='col-12'>
            <p className="h4 mb-3">Iniciar Sesión:</p>
              <label className='form-label' htmlFor="">Usuario / Correo</label>
              <input className='form-control mb-3' type="text" name="" onChange={handleUsernameChange} required value={user.username} />
            </div>
            <div className='col-12'>
              <label className='form-label' htmlFor="">Contraseña</label>
              <input className='form-control mb-3' type="password" name="" onChange={handlePasswordChange} required value={user.password} />
            </div>
            {!exists && <div className="alert alert-danger" role="alert">
              <p className="m-0 fw-bold"><i className="fa-solid fa-triangle-exclamation me-2"></i>Credenciales Inválidas</p>
              <p className="m-0 small">Por favor revise los datos ingresados</p>
            </div>}

            <button className='btn btn-primary col-12 mt-3'>Ingresar</button>
          </form>

          <div className="col-12 mt-4">
            <a className="small m-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-change-pw" style={{cursor: "pointer"}}>Cambiar Contraseña</a>
            <p className="small m-0">¿Problemas para ingresar? <a href="tel:+527772662884">Llámanos</a></p>
          </div>
        </div>

      </div>}

      {/* VIEWS */}
      {(currentUser) && (currentUser.role === "PACIENTE") && <ViewPaciente user={currentUser} />}
      {/* {(currentUser) && (currentUser.role === "MÉDICO") && <ViewMedic user={currentUser} />}  */}
      {(currentUser) && (currentUser.role === "EMPLEADO") && <ViewRecepción user={currentUser} />}


      {/* OFFCANVAS */}
      { <DetailUser />}
      { <DetailCita user={currentUser}/>}
      { <DetailVenta />}
      <FormChangePW />

    </div>
  );
}

export default App;

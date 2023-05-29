import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setDummyU} from "../Store/AppSlice"

function FormEditUser(props) {

  const dispatch = useDispatch()

  const conteoId = useSelector((state) => state.app.pacientes.length)
  const dummyU = useSelector((state) => state.app.dummyU)
  const [form, setForm] = useState(props.usuario)
  const [familias, setFamilias] = useState([])

  useEffect(() => {
    //asignar estado, cada vez que cambien las props

    setForm(props.usuario)
  }, [props])

  useEffect(() => {
    fetch("https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getFamiliasOptions")
      .then(res => res.json())
      .then(res => setFamilias(res))
  }, [dummyU])




  const handleSubmit = (e) => {
    e.preventDefault()
    //FETCH + DUMMY U

    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/updatePaciente?_id=${form._id}&nombre=${form.nombre}&aPaterno=${form.aPaterno}&aMaterno=${form.aMaterno}&tel1=${form.tel1}&tel2=${form.tel2}&observaciones=${form.observaciones}&rfc=${form.rfc}&username=${form.username}`,
    {method: "PUT"})
    .then(response => response.json())
    .then(response => response.modifiedCount === 1 ? alert("Paciente Modificado"): alert("Algo salió mal..."))
    .then(document.querySelector(".btn-close-edit-usuario").click())
      .then(
        setTimeout(() => {
            dispatch(setDummyU())
        }, 1500)
        )
  }

  // const handleTutor = (e) => {

  //     e.target.checked ?
  //       setForm({ ...form, idFamilia: form.idInt + form.aPaterno, esTutor: e.target.checked }) :
  //       setForm({ ...form, idFamilia: "", esTutor: e.target.checked })
  //   }

  // const handleFamiliaInput = (e) => {
  //   setForm({ ...form, idFamilia: e.target.value })
  // }
  const handleTipoSangre = (e) => {
    setForm({ ...form, tipoSangre: e.target.value })
  }
  const handleFNacimiento = (e) => {
    setForm({ ...form, fNacimiento: new Date(e.target.value + "T00:00:00").toLocaleString() })
  }
  const handleNombre = (e) => {
    setForm({ ...form, nombre: e.target.value })
  }
  const handleAPaterno = (e) => {
    setForm({ ...form, aPaterno: e.target.value })
  }
  const handleAMaterno = (e) => {
    setForm({ ...form, aMaterno: e.target.value })
  }
  const handleTel1 = (e) => {
    setForm({ ...form, tel1: e.target.value })
  }
  const handleTel2 = (e) => {
    setForm({ ...form, tel2: e.target.value })
  }
  const handleObservaciones = (e) => {
    setForm({ ...form, observaciones: e.target.value })
  }
  const handleRFC = (e) => {
    setForm({ ...form, rfc: e.target.value })
  }
  const handleUsername = (e) => {
    setForm({ ...form, username: e.target.value })
  }
  const handlePassword = (e) => {
    setForm({ ...form, password: e.target.value })
  }

  const passwordVisibility = () => {
    document.getElementById("eyecon2").classList.toggle("fa-eye-slash")
    document.getElementById("eyecon2").classList.toggle("fa-eye")
    if (document.getElementById("eyecon2").classList.contains("fa-eye")) {
      document.getElementById("pw2").setAttribute("type", "text")
    } else {
      document.getElementById("pw2").setAttribute("type", "password")
    }
  }

  return (
    <div className="offcanvas offcanvas-end" data-bs-backdrop="static" id='offcanvas-edit-user'>
      <div className="offcanvas-header d-flex justify-content-end">
        <button className="btn-close btn-close-edit-usuario" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body">

        <form action="" className="card" id="edit-user-form" onSubmit={handleSubmit} onReset={() => setForm(props.usuario)}>
          <div className="row card-body">

            <div className="col-12">
              <p className="h3">Editar Usuario</p>
              <hr />
            </div>
            {/* <div className="col-6 mb-3">
              <label htmlFor="">Tipo de Sangre:</label>
              <select name="" id="" className="form-select form-select-sm" required onChange={handleTipoSangre} value={props.usuario.tipoSangre}>
                <option value="" hidden>Selecciona...</option>
                <option value={`A%2B`}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B%2B"}>B+</option>
                <option value={"B-"}>B-</option>
                <option value={"AB%2B"}>AB+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"O%2B"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value="Desconoce">No sabe</option>
              </select>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="">Fecha Nacimiento:</label>
              <input type="date" className="form-control form-control-sm" required onChange={handleFNacimiento} value={new Date(props.usuario.fNacimiento).toLocaleDateString()} />
            </div> */}
            <div className="col-12 mb-3 ">
              <label htmlFor="">Nombre Completo:</label>
              <div className="input-group">
                <input type="text" className="form-control form-control-sm" placeholder='Nombre(s)' required onChange={handleNombre} value={form.nombre} />
                <input type="text" className="form-control form-control-sm" placeholder='A. Paterno' required onChange={handleAPaterno} value={form.aPaterno} />
                <input type="text" className="form-control form-control-sm" placeholder='A. Materno' required onChange={handleAMaterno} value={form.aMaterno} />
              </div>
            </div>

            <div className="col-6 mb-3">
              <label htmlFor="">Tel 1:</label>
              <input type="tel" className="form-control form-control-sm" required maxLength={10} onChange={handleTel1} pattern="[0-9]{10}" title='< Número telefónico a 10 dígitos. >' value={form.tel1} />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="">Tel 2:</label>
              <input type="tel" className="form-control form-control-sm" maxLength={10} onChange={handleTel2} pattern="[0-9]{10}" title='< Número telefónico a 10 dígitos. >' value={form.tel2} />
            </div>
            {/* <div className="col-6 mb-3 ">
                <div className="form-check form-switch">
                  <label htmlFor="" className='form-check-label'>¿Es Tutor?</label>
                  <input type="checkbox" className="form-check-input" onChange={handleTutor} />
                </div>
              </div>
              {form.esTutor ?
                <div className="col-6 mb-3">
                  <label htmlFor="">ID Familia:</label>
                  <input type="text" id='idFamilia' className="form-control form-control-sm" readOnly value={form.idFamilia} />
                </div> :
                <div className="col-6 mb3">
                  <label htmlFor="">ID Familia:</label>
                  <select name="" id="select-familia" className="form-select form-select-sm" required={!form.esTutor} onChange={handleFamiliaInput}>
                    <option value="" selected hidden>Selecciona...</option>
                    {familias.map((familia, key) => {
                      return (
                        <option key={key} value={familia}>{familia}</option>
                      )
                    })}
                  </select>
                </div>
              } */}
            <div className="col-12 mb-3 ">
              <label htmlFor="">Observaciones:</label>
              <textarea className='form-control form-control-sm' placeholder='Alergias, condiciones existentes, si se está medicando...' required onChange={handleObservaciones} maxLength={200} rows={4} value={form.observaciones}></textarea>
            </div>



            <div className="col-12 mb-3">
              <label htmlFor="">RFC:</label>
              <input type="text" className="form-control form-control-sm" minLength={11} maxLength={13} onChange={handleRFC} pattern="[a-zA-Z0-9-]+" title='< Solo letras y números. (Sin acentos). >' value={form.rfc} />
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="">Correo Electrónico:</label>
              <input type="text" className="form-control form-control-sm" autoComplete='off' required onChange={handleUsername} value={form.username} />
              <span className='form-text fst-italic'>(Si no está disponible, escribir iniciales + ID Interno)</span>
            </div>
            {/* <div className="col-12 mb-3">
                <label htmlFor="">Contraseña:</label>
                <div className="input-group">
                  <input id='pw2' type="password" className="form-control form-control-sm" autoComplete='off' required onChange={handlePassword} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="< Debe contener al menos: 8 caracteres, incluyendo una mayúscula y un número. >" value={form.password}/>
                  <button type='button' className="input-group-text btn btn-secondary" tabIndex={-1} onClick={passwordVisibility}><i id='eyecon2' className="fa-solid fa-eye-slash"></i></button>
                  </div>
                <span className='form-text fst-italic'>* Debe contener al menos: 8 caracteres, incluyendo una mayúscula y un número.</span>
              </div> */}
            <hr />
            <div className="col-12 text-end">
              <button type='reset' className="btn btn-outline-danger-subtle me-3">Limpiar</button>
              <button type=" submit" className="btn btn-primary">Actualizar</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default FormEditUser
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDummyU } from '../Store/AppSlice'

function FormCreateUser(props) {

  const dispatch = useDispatch()
  const conteoId = useSelector((state) => state.app.pacientes.length)
  const [form, setForm] = useState({
    idInt: conteoId +1,
    puntos: 0,
    role: "PACIENTE",
    nivelReward: 1,
    fRegistro: new Date().toISOString(),
    esTutor: false
  })

  const handleTutor = (e) => {

    e.target.checked ?
      setForm({ ...form, idFamilia: form.idInt + form.aPaterno, esTutor: e.target.checked }) :
      setForm({ ...form, idFamilia: "", esTutor: e.target.checked })
  }

  const handleFamiliaInput = (e) => {
    setForm({ ...form, idFamilia: e.target.value })
  }
  const handleTipoSangre = (e) => {
    setForm({ ...form, tipoSangre: e.target.value })
  }
  const handleFNacimiento = (e) => {
    setForm({ ...form, fNacimiento: e.target.value+ "T00:00:00"})
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

  const handleSubmit = (e) => {
    e.preventDefault()
    //FETCH + dispatch DUMMY
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/createUsuario?idInt=${`P`+Number(conteoId+1)}&fRegistro=${form.fRegistro}&esTutor=${form.esTutor}&tipoSangre=${form.tipoSangre}&nombre=${form.nombre}&aPaterno=${form.aPaterno}&aMaterno=${form.aMaterno}&tel1=${form.tel1}&tel2=${form.tel2}&idFamilia=${form.idFamilia}&observaciones=${form.observaciones}&rfc=${form.rfc}&username=${form.username}&password=${form.password}&fNacimiento=${form.fNacimiento}`,
        {method: "POST"})
      .then(res=>res.json())
      .then( res => {!res.error? alert("USUARIO CREADO"): alert("ALGO SALIÓ MAL" + `\n ${res.error}`)})
      .then( document.querySelector("#add-user-form").reset())
      .then(document.querySelector(".btn-close-new-user").click())
      .then(
        setTimeout(() => {
            dispatch(setDummyU())
        }, 500)
        )
  }

  const passwordVisibility = ()=>{
    document.getElementById("eyecon").classList.toggle("fa-eye-slash")
    document.getElementById("eyecon").classList.toggle("fa-eye")
    if (document.getElementById("eyecon").classList.contains("fa-eye")) {
      document.getElementById("pw").setAttribute("type", "text")
    } else {
      document.getElementById("pw").setAttribute("type", "password")
    }
  }

  return (
    <div>
      <div className="offcanvas offcanvas-end" data-bs-backdrop="static" id='form-create-user'>
        <div className="offcanvas-header d-flex justify-content-end">
          <button className="btn-close btn-close-new-user" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <form className='card' action="" id='add-user-form' onSubmit={handleSubmit} onReset={() => {
            setForm({
              idInt: conteoId+1,
              puntos: 0,
              role: "PACIENTE",
              nivelReward: 1,
              fRegistro: new Date().toISOString(),
              esTutor: false
            })
          }}>
            <div className="row card-body">
              <div className="col-12 mb-3">
                <p className="h3">Usuario (ID #{Number(conteoId+1)})</p>
              </div>

              <div className="col-6 mb-3">
                <label htmlFor="">Tipo de Sangre:</label>
                <select name="" id="" className="form-select form-select-sm" required onChange={handleTipoSangre}>
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
                <input type="date" className="form-control form-control-sm" required onChange={handleFNacimiento} />
              </div>
              <div className="col-12 mb-3 ">
                <label htmlFor="">Nombre Completo:</label>
                <div className="input-group">
                  <input type="text" className="form-control form-control-sm" placeholder='Nombre(s)' required onChange={handleNombre} />
                  <input type="text" className="form-control form-control-sm" placeholder='A. Paterno' required onChange={handleAPaterno} />
                  <input type="text" className="form-control form-control-sm" placeholder='A. Materno' required onChange={handleAMaterno} />
                </div>
              </div>
              
              <div className="col-6 mb-3">
                <label htmlFor="">Tel 1:</label>
                <input type="tel" className="form-control form-control-sm" required maxLength={10} onChange={handleTel1} pattern="[0-9]{10}" title='< Número telefónico a 10 dígitos. >'/>
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="">Tel 2:</label>
                <input type="tel" className="form-control form-control-sm" maxLength={10} onChange={handleTel2} pattern="[0-9]{10}"/>
              </div>
              <div className="col-6 mb-3 ">
                <div className="form-check form-switch">
                  <label htmlFor="" className='form-check-label'>¿Es Tutor?</label>
                  <input type="checkbox" className="form-check-input" onChange={handleTutor} />
                </div>
              </div>
              {form.esTutor ?
                <div className="col-6 mb-3">
                  <label htmlFor="">ID Familia:</label>
                  <input type="text" id='idFamilia' className="form-control form-control-sm" readOnly value={Number(conteoId+1)+ form.aPaterno} />
                </div> :
                <div className="col-6 mb3">
                  <label htmlFor="">ID Familia:</label>
                  <select name="" id="select-familia" className="form-select form-select-sm" required={!form.esTutor} onChange={handleFamiliaInput}>
                    <option value="" selected hidden>Selecciona...</option>
                    {props.familias.map((familia, key) => {
                      return (
                        <option key={key} value={familia}>{familia}</option>
                      )
                    })}
                  </select>
                </div>
              }
              <div className="col-12 mb-3 ">
                <label htmlFor="">Observaciones:</label>
                <textarea className='form-control form-control-sm' placeholder='Alergias, condiciones existentes, si se está medicando...' required onChange={handleObservaciones} maxLength={200} rows={4}></textarea>
              </div>

              

              <div className="col-12 mb-3">
                <label htmlFor="">RFC:</label>
                <input type="text" className="form-control form-control-sm" minLength={11} maxLength={13} onChange={handleRFC} pattern="[a-zA-Z0-9]+" title='< Solo letras y números. (Sin acentos). >'/>
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="">Correo Electrónico:</label>
                <input type="text" className="form-control form-control-sm" autoComplete='off' required onChange={handleUsername} />
                <span className='form-text fst-italic'>(Si no está disponible, escribir iniciales + ID Interno)</span>
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="">Contraseña:</label>
                <div className="input-group">
                  <input id='pw' type="password" className="form-control form-control-sm" autoComplete='off' required onChange={handlePassword} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="< Debe contener al menos: 8 caracteres, incluyendo una mayúscula y un número. >" />
                  <button type='button' className="input-group-text btn btn-secondary" tabIndex={-1} onClick={passwordVisibility}><i id='eyecon' className="fa-solid fa-eye-slash"></i></button>
                  </div>
                <span className='form-text fst-italic'>* Debe contener al menos: 8 caracteres, incluyendo una mayúscula y un número.</span>
              </div>
              <hr />
              <div className="col-12 text-end">
                <button type='reset' className="btn btn-outline-danger-subtle me-3">Limpiar</button>
                <button type=" submit" className="btn btn-primary">Crear</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default FormCreateUser
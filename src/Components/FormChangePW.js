import React, { useState } from 'react'

function FormChangePW() {

    const [form, setForm] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/changePW?username=${form.username}&prevPW=${form.prevPW}&newPW=${form.newPW}`, { method: "PUT" })
        .then(res=>res.json())
      .then( res => {!res.error? alert("CONTRASEÑA ACTUALIZADA"): alert("ALGO SALIÓ MAL" + `\n ${res.error}`)})
      .then( document.querySelector("#change-pw-form").reset())
      .then(document.querySelector(".btn-close-change-pw").click())
    }

    const passwordVisibility = () => {
        document.getElementById("eyecon3").classList.toggle("fa-eye-slash")
        document.getElementById("eyecon3").classList.toggle("fa-eye")
        if (document.getElementById("eyecon3").classList.contains("fa-eye")) {
            document.getElementById("pw3").setAttribute("type", "text")
        } else {
            document.getElementById("pw3").setAttribute("type", "password")
        }
        document.getElementById("eyecon4").classList.toggle("fa-eye-slash")
        document.getElementById("eyecon4").classList.toggle("fa-eye")
        if (document.getElementById("eyecon4").classList.contains("fa-eye")) {
            document.getElementById("pw4").setAttribute("type", "text")
        } else {
            document.getElementById("pw4").setAttribute("type", "password")
        }
    }

    const handleUsername = (e) => {
        setForm({...form, username: e.target.value})
    }
    const handleOldPassword = (e) => {
        setForm({...form, prevPW: e.target.value})
    }
    const handleNewPassword = (e) => {
        setForm({...form, newPW: e.target.value})
    }


    return (
        <div>
            <div className="offcanvas offcanvas-end" data-bs-backdrop="static" id='offcanvas-change-pw'>
                <div className="offcanvas-header d-flex justify-content-end">
                    <button className="btn-close btn-close-change-pw" data-bs-dismiss="offcanvas"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="card p-3">
                        <p className="h4">Cambiar Contraseña</p>
                        <div className="alert alert-warning small">
                            <p>El cambio de contraseña sustituye la contraseña "vieja" con una "nueva".</p>
                            <p className='m-0'>Si desconoce o no recuerda su contraseña "vieja", <a href="tel:+527772662884">comuníquese con nostros.</a></p>
                        </div>
                        <hr />
                        <div className="row">
                            <form id='change-pw-form' onSubmit={handleSubmit} onReset={()=>{setForm({})}}>
                                <div className="col-12 mb-3">
                                    <label htmlFor="">Usuario / Correo</label>
                                    <input type="text" className="form-control form-control-sm" required onChange={handleUsername}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="">Contraseña</label>
                                    <div className="input-group">
                                        <input id='pw3' type="password" className="form-control form-control-sm" required onChange={handleOldPassword} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="< Debe contener al menos: 8 caracteres, incluyendo una mayúscula y un número. >" />
                                        <button type='button' className="input-group-text btn btn-secondary" tabIndex={-1} onClick={passwordVisibility}><i id='eyecon3' className="fa-solid fa-eye-slash"></i></button>
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="">Contraseña Nueva</label>
                                    <div className="input-group">
                                        <input id='pw4' type="password" className="form-control form-control-sm" required onChange={handleNewPassword} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="< Debe contener al menos: 8 caracteres, incluyendo una mayúscula y un número. >" />
                                        <button type='button' className="input-group-text btn btn-secondary" tabIndex={-1} onClick={passwordVisibility}><i id='eyecon4' className="fa-solid fa-eye-slash"></i></button>
                                    </div>
                                </div>
                                <div className="col-12 text-end">
                                    <button type='reset' className="btn btn-outline-danger-subtle me-3">Limpiar</button>
                                    <button type=" submit" className="btn btn-primary">Cambiar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormChangePW
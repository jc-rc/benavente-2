import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDummyC } from '../Store/AppSlice'

function FormCreateCita(props) {

    const dispatch = useDispatch()
    const pacientesOptions = useSelector((state)=> state.app.pacientes)
    const médicosOptions = useSelector((state)=> state.app.médicos)
    const fechaClick = useSelector((state)=> state.app.fechaClick)
    const [form, setForm] = useState({
        status: "PENDIENTE",
    })

    useEffect(() => {
      setForm({...form, fecha: fechaClick})
    
      
    }, [fechaClick])
    

    const handleSubmit = (e)=>{
        e.preventDefault()

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/createCita?fecha=${form.fecha}&horaI=${form.horaI}&horaF=${form.horaF}&paciente=${form.paciente}&médico=${form.médico}&consultorio=${form.consultorio}&asunto=${form.asunto}&fechaHora=${form.fechaHora}&username=${form.username}&idFamilia=${form.idFamilia}`,
            { method: "POST" })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    alert(`ERROR:\n Ya existe una cita con esta fecha/hora en este consultorio.`)
                } else {
                    alert("CITA CREADA, RECARGANDO LISTADO...")
                }
            })
            .then(document.querySelector("#add-cita-form").reset())
            .then(document.querySelector(".btn-close-new-cita").click())
            .then(setTimeout(() => {
               dispatch(setDummyC())
            }, 500))
    }

    const handleFecha = (e)=>{
        setForm({...form, fecha: e.target.value})
    }
    const handleHoraI = (e)=>{
        setForm({...form, horaI: e.target.value})
    }
    const handleHoraF = (e)=>{
        setForm({...form, horaF: e.target.value})
    }
    const handlePaciente = (e)=>{

        var selectedP = document.querySelector("#paciente-select option:checked").dataset.username
        var selectedF = document.querySelector("#paciente-select option:checked").dataset.familia
        setForm({...form, paciente: e.target.value, username: selectedP, idFamilia: selectedF})
    }
    const handleMédico = (e)=>{
        setForm({...form, médico: e.target.value})
    }
    const handleConsultorio = (e)=>{
        setForm({...form, consultorio: e.target.value})
    }
    const handleAsunto = (e)=>{
        setForm({...form, asunto: e.target.value})
    }



    return (
        <div>
            <div className="offcanvas offcanvas-end" data-bs-backdrop="static" id='form-create-cita'>
                <div className="offcanvas-header d-flex justify-content-end">
                    <button className="btn-close btn-close-new-cita" data-bs-dismiss="offcanvas"></button>
                </div>

                <div className="offcanvas-body">
                    <form className='card' action="" id="add-cita-form" onSubmit={handleSubmit} onReset={() => {
                        setForm({
                            status: "PENDIENTE"
                        })
                    }}>
                        <div className="row card-body">

                            <div className="col-12 mb-3">
                                <p className="h3">Nueva Cita</p>
                            </div>

                            <div className="col-12 mb-3">
                                <label htmlFor="">Fecha:</label>
                                <input className='form-control' type="date" required onChange={handleFecha} value={form.fecha} />
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="">Hora Inicio:</label>
                                <input className='form-control' type="time" required onChange={handleHoraI} step={1200} min={"08:00"} max={"18:00"}/>
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="">Hora Fin:</label>
                                <input className='form-control' type="time" required onChange={handleHoraF} step={1200} min={form.horaI} max={"18:40"}/>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Paciente:</label>
                                <select name="" className='form-select'required onChange={handlePaciente} id="paciente-select">
                                    <option value="" hidden>Selecciona...</option>
                                    {pacientesOptions.map((paciente,key)=>{
                                        return(
                                            <option key={key} value={paciente.nombre+" "+paciente.aPaterno+" "+paciente.aMaterno} data-username={paciente.username} data-familia={paciente.idFamilia}>{paciente.nombre+" "+paciente.aPaterno+" "+paciente.aMaterno}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Médico:</label>
                                <select name="" className='form-select'required onChange={handleMédico}>
                                    <option value="" hidden>Selecciona...</option>
                                    {médicosOptions.map((médico,key)=>{
                                        return(
                                            <option key={key}  value={médico.nombre+" "+médico.aPaterno+" "+médico.aMaterno}>{médico.nombre+" "+médico.aPaterno+" "+médico.aMaterno}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Consultorio:</label>
                                <select name="" className="form-select"required onChange={handleConsultorio}>
                                    <option hidden  value="">Selecciona...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Asunto:</label>
                                <textarea className='form-control' type="text" required onChange={handleAsunto} maxLength={200} rows={6}/>
                            </div>
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

export default FormCreateCita
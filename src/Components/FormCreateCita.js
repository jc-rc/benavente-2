import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDummyC } from '../Store/AppSlice'

function FormCreateCita(props) {

    const dispatch = useDispatch()
    const pacientesOptions = useSelector((state)=> state.app.pacientes)
    const médicosOptions = useSelector((state)=> state.app.médicos)
    const [form, setForm] = useState({
        status: "PENDIENTE"
    })

    const handleSubmit = (e)=>{
        e.preventDefault()

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/createCita?fecha=${form.fecha}&horaI=${form.horaI}&horaF=${form.horaF}&paciente=${form.paciente}&médico=${form.médico}&consultorio=${form.consultorio}&asunto=${form.asunto}&fechaHora=${form.fechaHora}`,
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
        setForm({...form, paciente: e.target.value})
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
                                <label htmlFor="">Fecha</label>
                                <input className='form-control' type="date"required onChange={handleFecha} />
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="">Hora I</label>
                                <input className='form-control' type="time" required onChange={handleHoraI}/>
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="">Hora F</label>
                                <input className='form-control' type="time" required onChange={handleHoraF}/>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Paciente</label>
                                <select name="" className='form-select'required onChange={handlePaciente}>
                                    <option value="" selected hidden>Selecciona...</option>
                                    {pacientesOptions.map((paciente,key)=>{
                                        return(
                                            <option key={key} value={paciente.nombre+" "+paciente.aPaterno+" "+paciente.aMaterno}>{paciente.nombre+" "+paciente.aPaterno+" "+paciente.aMaterno}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Médico</label>
                                <select name="" className='form-select'required onChange={handleMédico}>
                                    <option value="" selected hidden>Selecciona...</option>
                                    {médicosOptions.map((médico,key)=>{
                                        return(
                                            <option key={key} value={médico.nombre+" "+médico.aPaterno+" "+médico.aMaterno}>{médico.nombre+" "+médico.aPaterno+" "+médico.aMaterno}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Consultorio</label>
                                <select name="" className="form-select"required onChange={handleConsultorio}>
                                    <option hidden  value="">Selecciona...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Asunto</label>
                                <textarea className='form-control' type="text" required onChange={handleAsunto}/>
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
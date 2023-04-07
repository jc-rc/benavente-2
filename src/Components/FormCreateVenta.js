import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDummyV } from '../Store/AppSlice'

function FormCreateVenta() {


    const dispatch = useDispatch()
    const pacientesOptions = useSelector((state) => state.app.pacientes)

    const [form, setForm] = useState({
        status: "FACTURADA"
    })
    const [multiplicador, setMultiplicador] = useState(0)
    const [ptsAvail, setPtsAvail] = useState(0)


    const handleFechaHora = (e) => {
        setForm({ ...form, fechaHora: e.target.value })
    }
    const handleConsultorio = (e) => {
        setForm({ ...form, consultorio: e.target.value })
    }
    const handleVenta = (e) => {
        setForm({ ...form, venta: Number(e.target.value) })
    }
    const handleDesc = (e) => {
        setForm({ ...form, desc: e.target.value })
    }


    const handlePaciente = () => {
        var selectedP = document.querySelector("#paciente-select option:checked")

        

        switch (selectedP.dataset.nivel) {
            case "1":
                setMultiplicador(0.1)
                console.log(multiplicador);
                setForm({ ...form, nivel: selectedP.dataset.nivel, paciente: selectedP.value, _idP: selectedP.dataset.id })
                setPtsAvail(selectedP.dataset.pts)
                break;
            case "2":
                setMultiplicador(0.105)
                console.log(multiplicador);
                setForm({ ...form, nivel: selectedP.dataset.nivel, paciente: selectedP.value, _idP: selectedP.dataset.id })
                setPtsAvail(selectedP.dataset.pts)
                break;
            case "3":
                setMultiplicador(0.11)
                console.log(multiplicador);
                setForm({ ...form, nivel: selectedP.dataset.nivel, paciente: selectedP.value, _idP: selectedP.dataset.id })
                setPtsAvail(selectedP.dataset.pts)
                break;

            default:
                break;
        }

        
    }

    const handlePago = (e) => {

        switch (e.target.value) {

            case "directo":
                let puntosCalc = Number(form.venta) * Number(multiplicador)
                console.log(form.venta, multiplicador);
                setForm({ ...form, pago: e.target.value, total: form.venta, puntos: puntosCalc })
                break;

            case "puntos":

                setForm({ ...form, pago: e.target.value, puntos: 0 })
                break;

            default:
                break;
        }

    }

    const handlePtsRedeem = (e) =>{
        setForm({...form, puntos: Number(e.target.value), total: form.venta - ((0.5)*(Number(e.target.value)))})
    
        console.log(form.venta - ((0.5)*(Number(e.target.value))));
        
       
      }

      const handleSubmit = (e)=>{
        e.preventDefault()
        //FETCH + dispatch DUMMY
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/createVenta?fechaHora=${form.fechaHora}&nivel=${form.nivel}&paciente=${form.paciente}&_idP=${form._idP}&consultorio=${form.consultorio}&status=${form.status}&desc=${form.desc}&venta=${form.venta}&pago=${form.pago}&total=${form.total}&puntos=${form.puntos}`,
        {method: "POST"})
        .then(response => response.json())
        .then( response => {response? alert("VENTA CREADA"): alert("ALGO SALIÓ MAL")})
        .then( document.querySelector("#add-venta-form").reset())
        .then(document.querySelector(".btn-close-new-venta").click())
        .then(()=>{
          if(form.pago === "puntos"){
            fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/subsPtsPaciente?_id=${form._idP}&puntos=${form.puntos}`, {method: "PUT"})
            .then(response => response.json())
            .then(response => response.modifiedCount > 0 ? alert(`${form.puntos} PUNTOS REDIMIDOS`): alert("ALGO SALIÓ MAL"))
          }
        })
        .then(
            setTimeout(() => {
                dispatch(setDummyV())
            }, 500)
            )
      }

    return (
        <div>
            <div className="offcanvas offcanvas-end" data-bs-backdrop="static" id='form-create-venta'>
                <div className="offcanvas-header d-flex justify-content-end">
                    <button className="btn-close btn-close-new-venta" data-bs-dismiss="offcanvas"></button>

                </div>

                <div className="offcanvas-body">
                    <form className='card' id='add-venta-form' onSubmit={handleSubmit} onReset={() => { setForm({ status: "FACTURADA" }) }}>
                        <div className="row card-body">
                            <div className="col-12 mb-3">
                                <p className="h3">Nueva Venta</p>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Fecha/Hora:</label>
                                <input type="datetime-local" className="form-control" onChange={handleFechaHora} required />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Venta: ($)</label>
                                <input type="text" className="form-control" onChange={handleVenta} required />
                            </div>
                            <div className="col-9 mb-3">
                                <label htmlFor="">Paciente:</label>
                                <select id="paciente-select" className='form-select' onChange={handlePaciente} required>
                                    <option hidden value="">Selecciona...</option>
                                    {pacientesOptions.map((paciente, key) => {
                                        return (
                                            <option key={key} value={paciente.nombre + " " + paciente.aMaterno + " " + paciente.aPaterno} data-nivel={paciente.nivelReward} data-id={paciente._id} data-pts={paciente.puntos}>{paciente.nombre + " " + paciente.aMaterno + " " + paciente.aPaterno}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            {form.nivel && <div className="col-3 mb-3">
                                {/* Condicionado a que exista un paciente seleccionado */}
                                <label htmlFor="">Nivel:</label>
                                <input type="text" className="form-control text-center" disabled value={form.nivel} />
                            </div>}

                            <div className="col-12 mb-3">
                                <label htmlFor="">Sillón:</label>
                                <select name="" className="form-select" onChange={handleConsultorio} required>
                                    <option hidden value="">Selecciona...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="Tienda">Tienda</option>
                                </select>
                            </div>

                            <div className="col-12 mb-3">
                                <label htmlFor="">Descripción:</label>
                                <input type="text" className="form-control" onChange={handleDesc} required />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Método:</label>
                                <select name="" className="form-select" onChange={handlePago} required>
                                    <option hidden value="">Selecciona...</option>
                                    <option value="directo">Directo</option>
                                    {ptsAvail > 0 && <option value="puntos">Usando Puntos</option>}

                                </select>
                            </div>
                            <hr />
                            {/* ZONA VARIABLE */}
                            {form.pago === "directo" ?
                                <div className="col-12">
                                    <dl className='row'>
                                        <dt className='col-6'>Total</dt>
                                        <dd className='col-6 text-end'>$ {form.total}</dd>

                                        <dt className='col-6'>Puntos Generados</dt>
                                        <dd className='col-6 text-end text-success'>+{form.puntos}</dd>
                                    </dl>
                                </div>
                                : null}
                            {form.pago === "puntos" ?
                                <div className="col-12">
                                    <label htmlFor="" className="form label">¿Cuántos Puntos?</label>
                                    <input type="number" name="" id="" className="form-control" placeholder={'Puntos Máximos: ' + ptsAvail} max={ptsAvail} required pattern='[0-9]+' title='<<Solo números >>' onChange={handlePtsRedeem} />
                                    <hr />
                                    <dl className='row'>
                                        <dt className='col-6'>Puntos Redimidos:</dt>
                                        <dd className='col-6 text-end text-danger'>-{form.puntos}</dd>
                                        <dt className='col-6'>Total:</dt>
                                        <dd className='col-6 text-end'>$ {form.total}</dd>
                                    </dl>
                                    <hr />
                                </div>
                                : null}
                            
                            <div className="col-12 text-end">
                                <button type='reset' className="btn btn-outline-danger-subtle me-3">Limpiar</button>
                                <button type='submit' className="btn btn-primary">Crear</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default FormCreateVenta
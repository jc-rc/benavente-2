import React from 'react'
import { useSelector } from "react-redux"

function Dashboard() {

    const pacientes = useSelector((state) => state.app.pacientes)
    const ventas = useSelector((state) => state.app.ventas)
    const citas = useSelector((state) => state.app.citas)
    var sumVentas = 0
    var sumPuntosDirecto = 0
    var sumPuntosPuntos = 0

    //Filtrar por mes
    const monthPacientes = pacientes.filter(p => new Date(p.fRegistro).getMonth() + 1 === new Date().getMonth() + 1)
    const monthVentas = ventas.filter(v => new Date(v.fechaHora).getMonth() + 1 === new Date().getMonth() + 1 && v.status === "PAGADA")
    const monthCitas = citas.filter(c => new Date(c.fechaHoraI).getMonth() + 1 === new Date().getMonth() + 1)

    const ventasDirectas = monthVentas.filter(v=> v.pago === "directo")
    const ventasPuntos = monthVentas.filter(v=> v.pago === "puntos")

    monthVentas.forEach(v => {
        sumVentas += v.total
    });

    ventasDirectas.forEach(v=>{
        sumPuntosDirecto += v.puntos
    })
    ventasPuntos.forEach(v=>{
        sumPuntosPuntos += v.puntos
    })


    return (
        <div className='px-3'>
            <div className="row gy-3">
                <div className="col-12 p-0">

                    <div className='alert alert-light h4'> Datos: {new Intl.DateTimeFormat("es-MX", { month: "long" }).format(new Date())} {new Date().getFullYear()}
                    </div>

                </div>
                <div className="col-sm-3 col-12 p-2 text-center border rounded d-flex flex-column justify-content-center" style={{ height: 200 }}>
                    <span className='h1'>{monthCitas.length}</span>
                    <p className='m-0'>Citas</p>
                </div>
                <div className="col-sm-3 col-12 p-2 text-center border rounded d-flex flex-column justify-content-center" style={{ height: 200 }}>
                    <span className='h1'>{monthPacientes.length}</span>
                    <p className='m-0'> Nuevos Pacientes</p>
                </div>
                <div className="col-sm-3 col-12 p-2 text-center border rounded d-flex flex-column justify-content-center" style={{ height: 200 }}>
                    <span className='h1'>{monthVentas.length}</span>
                    <p className='m-0'>Ventas</p>
                </div>
                <div className="col-sm-3 col-12 p-2 text-center border rounded d-flex flex-column justify-content-center" style={{ height: 200 }}>
                    <span className='h1'>${sumVentas}</span>
                    <p className='m-0'>Ingresos</p>
                </div>
                <div className="col-sm-6 col-12 p-2 text-center border rounded d-flex flex-column justify-content-center" style={{ height: 200 }}>
                    <span className='h1'>{sumPuntosDirecto.toFixed(2)} pts.</span>
                    <p className='m-0'>Puntos Otorgados</p>
                </div>
                <div className="col-sm-6 col-12 p-2 text-center border rounded d-flex flex-column justify-content-center" style={{ height: 200 }}>
                    <span className='h1'>{sumPuntosPuntos} pts.</span>
                    <p className='m-0'>Puntos Canjeados</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
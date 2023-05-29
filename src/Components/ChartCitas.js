import React, { useState, useEffect } from 'react'
import { Calendar } from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es"
import { Offcanvas } from 'bootstrap'


import { useDispatch } from 'react-redux'
import { setViewCita, setFechaClick } from "../Store/AppSlice"

function ChartCitas(props) {

    const dispatch = useDispatch()
    const myOffcanvas = new Offcanvas("#offcanvas-cita")

    const handleEventClick = (e) => {

        

            dispatch(setViewCita(e.event._def.extendedProps))

            myOffcanvas.show()
        


    }
    const handleDateClick = (e) => {

        if (props.user.role !== "PACIENTE") {
            dispatch(setFechaClick(e.dateStr))
            document.querySelector(".btn-create-cita").click()
        }
    }

    return (
        <div>
            <FullCalendar
                headerToolbar={{
                    center: "prev,dayGridMonth,timeGridWeek,timeGridDay,next",
                    right: "today"
                }}
                height={600}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                showNonCurrentDates={false}
                fixedWeekCount={false}
                slotDuration="00:20:00"
                slotLabelFormat={[
                    { hour: "2-digit", minute: "2-digit" }]
                }
                slotMinTime="08:00:00"
                slotMaxTime="19:00:00"
                locale={esLocale}
                buttonText={
                    { today: "HOY", month: "MES", week: "SEMANA", day: "DíA" }
                }
                nowIndicator="true"
                events={props.citas.map((cita) => {

                    let colorBadge = ""
                    switch (cita.status) {
                        case "PENDIENTE":
                            colorBadge = "orange"
                            break;
                        case "CONFIRMADA":
                            colorBadge = "info"
                            break;
                        case "EN PROGRESO":
                            colorBadge = "primary"
                            break;
                        case "REALIZADA":
                            colorBadge = "success"
                            break;
                        case "NO REALIZADA":
                            colorBadge = "warning"
                            break;
                        case "CANCELADA":
                            colorBadge = "danger"
                            break;
                        default:
                            break;
                    }
                    return (
                        {
                            title: "Sillón " + cita.consultorio + " | " + cita.paciente,
                            start: cita.fechaHoraI,
                            end: cita.fechaHoraF,
                            fechaHoraI: cita.fechaHoraI,
                            fechaHoraF: cita.fechaHoraF,
                            asunto: cita.asunto,
                            paciente: cita.paciente,
                            médico: cita.médico,
                            consultorio: cita.consultorio,
                            status: cita.status,
                            _id: cita._id,
                            username: cita.username,
                            allDay: false,
                            display: "block",
                            className: ` px-1 text-bg-${colorBadge} border rounded `,
                        }
                    )
                })}
                eventClick={handleEventClick}
                dateClick={handleDateClick} />
        </div>
    )
}

export default ChartCitas
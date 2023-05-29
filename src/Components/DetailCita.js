import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setDummyC } from "../Store/AppSlice"

function DetailCita(props) {

    const cita = useSelector((state) => state.app.viewCita)
    const dispatch = useDispatch()

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



    //DELETE CITA
    const handleDeleteCita = (id) => {
        console.log(id);


        if (window.confirm("¿EN VERDAD DESEA ELIMINAR ESTA CITA?")) {
            fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/deleteCita?_id=${id}`,
                { method: "DELETE" })
                .then(alert("CITA ELIMINADA"))
                .then(dispatch(setDummyC()))
                .then(document.querySelector(".btn-close-cita").click())
        } else {
            alert("OPERACIÓN CANCELADA, RECARGANDO LISTADO...")
        }
    }

    const handleUpdateStatus = () => {

        let newStatus = document.querySelector("#status-cita").value

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/updateCitaStatus?_id=${cita._id}&status=${newStatus}`,
            { method: "PUT" })
            .then(response => response.json())
            .then(response => response ? alert("STATUS DE CITA ACTUALIZADA") : alert("ALGO SALIÓ MAL"))
            .then(document.querySelector(".btn-close-cita").click())
            .then(
                setTimeout(() => {
                    dispatch(setDummyC())

                }, 500)
            )

        //Then Send Correo a cita.paciente.username
        // o Mensaje a cita.paciente.tel1 / tel2
        if (window.Email) {
            window.Email.send({
                SecureToken: "393c7070-7578-46c7-a2bd-f7b301360182",
                To: `${cita.username}`,
                From: "recepcion@benaventedental.com.mx",
                Subject: "Status de Cita Cambió",
                Body: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head>
                <title>
                </title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width">
                <style type="text/css">body, html {
                  margin: 0px;
                  padding: 0px;
                  -webkit-font-smoothing: antialiased;
                  text-size-adjust: none;
                  width: 100% !important;
                }
                  table td, table {
                  }
                  #outlook a {
                    padding: 0px;
                  }
                  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
                    line-height: 100%;
                  }
                  .ExternalClass {
                    width: 100%;
                  }
                  @media only screen and (max-width: 480px) {
                     table tr td table.edsocialfollowcontainer {width: auto !important;} table, table tr td, table td {
                      width: 100% !important;
                    }
                    img {
                      width: inherit;
                    }
                    .layer_2 {
                      max-width: 100% !important;
                    }
                    .edsocialfollowcontainer table {
                      max-width: 25% !important;
                    }
                    .edsocialfollowcontainer table td {
                      padding: 10px !important;
                    }
                  }
                </style>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
              </head><body style="padding:0; margin: 0;background: #efefef">
                <table style="height: 100%; width: 100%; background-color: #efefef;" align="center">
                  <tbody>
                    <tr>
                      <td valign="top" id="dbody" data-version="2.31" style="width: 100%; height: 100%; padding-top: 0px; padding-bottom: 0px; background-color: #efefef;">
                        <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <table class="layer_1" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; box-sizing: border-box; width: 100%; margin: 0px auto;">
                          <tbody>
                            <tr>
                              <td class="drow" valign="top" align="center" style="background-color: #efefef; box-sizing: border-box; font-size: 0px; text-align: center;">
                                <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                                
                                <!--[if (gte mso 9)|(IE)]></td><td valign="top"><![endif]-->
                                <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                                  <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                    <tbody>
                                      <tr>
                                        <td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                                          <p style="text-align: right; font-size: 9px; margin: 0px; padding: 0px;">¿No se ve nada? Léalo&nbsp;<a href="{view}" style="color: #3498db; text-decoration: none;">Online</a></p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                              </td>
                            </tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 100%; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edimg" style="padding: 10px; box-sizing: border-box; text-align: center;"><img src="https://api.smtprelay.co/userfile/8f20a816-ff14-49ed-9fae-c6dc42289d51/logoBenaLargo.png" alt="Image" width="500" style="border-width: 0px; border-style: none; max-width: 500px; width: 100%;"></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr>
                            
                            
                            <tr>
                              <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                                <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                                <div class="layer_2" style="max-width: 100%; display: inline-block; vertical-align: top; width: 100%;">
                                  <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                    <tbody>
                                      <tr>
                                        <td valign="top" class="emptycell" style="padding: 10px;">
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                            <tr>
                              <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                                <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                                <div class="layer_2" style="max-width: 100%; display: inline-block; vertical-align: top; width: 100%;">
                                  <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                    <tbody>
                                      <tr>
                                        <td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                                          <p class="style1 text-center" style="text-align: center; margin: 0px; padding: 0px; color: #424a60; font-size: 28px; font-family: Helvetica, Arial, sans-serif;">El status de su cita cambió.</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                              </td>
                            </tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 100%; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="breakline" style="padding: 0px;"><p style="border-style: solid none none; border-width: 1px 0px 0px; margin: 8px 0px; padding: 0px;">&nbsp;</p></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr>
                            <tr>
                              <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                                <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                                <div class="layer_2" style="max-width: 100%; display: inline-block; vertical-align: top; width: 100%;">
                                  <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                    <tbody>
                                      <tr>
                                        <td valign="top" class="emptycell" style="padding: 10px;">
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                              </td>
                            </tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p style="margin: 0px; padding: 0px;">Apreciable cliente, le informamos que el status de&nbsp;su cita:</p></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr>
                            <tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p style="margin: 0px; padding: 0px;"><strong>Fecha / Hora:</strong> ${cita.fechaHoraI}</p>
            <p style="margin: 0px; padding: 0px;"><strong>Paciente:</strong> ${cita.paciente}</p>
            <p style="margin: 0px; padding: 0px;"><strong>Médico:</strong> ${cita.médico}</p>
            <p style="margin: 0px; padding: 0px;"><strong>Consultorio:</strong> ${cita.consultorio}</p>
            <p style="margin: 0px; padding: 0px;"><strong>Asunto:</strong> ${cita.asunto}</p></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td><td valign="top"><![endif]--><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p style="margin: 0px; padding: 0px;">Cambió de / a:</p></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p class="style1" style="margin: 0px; padding: 0px; color: #424a60; font-size: ${"18"}; font-family: Helvetica, Arial, sans-serif;"><strong>${cita.status} ➡️ ${newStatus}</strong></p></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="display: inline-block; vertical-align: top; width: 100%; max-width: 600px;"><table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="breakline" style="padding:0"><p style="border-style: solid none none; border-width: 1px 0px 0px; margin: 8px 0px; padding: 0px;">&nbsp;</p></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p style="margin: 0px; padding: 0px;">Agradecemos su preferencia,</p>
            <p style="margin: 0px; padding: 0px;"><strong>Recepción,</strong></p>
            <p style="margin: 0px; padding: 0px;">Benavente Family DentalCenter</p>
            <p style="margin: 0px; padding: 0px;"><strong><br></strong></p><p style="margin: 0px; padding: 0px;">Agende su cita o procure más información: <a href="tel:+527772662884">${"7772662884"}</a><strong></strong><br></p></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr>
                            
                            
                            <tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                                  <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                    <tbody>
                                      <tr>
                                        <td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="emptycell" style="padding: 10px;"></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr>
                            
                            
                            
                            <tr>
                              <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                                <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                                <div class="layer_2" style="max-width: 100%; display: inline-block; vertical-align: top; width: 100%;">
                                  <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                    <tbody>
                                      <tr>
                                        <td valign="top" class="emptycell" style="padding: 10px;">
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                            
                            
                            
                          </tbody>
                        </table>
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </body></html>`
            })
                .then(response => response === "OK" ?alert("Notificación Enviada al Paciente") : alert(`El envío de notificación falló ${response}`))
        }




    }

    return (
        <div>
            <div className="offcanvas offcanvas-end " data-bs-backdrop="static" id='offcanvas-cita'>
                <div className="offcanvas-header d-flex justify-content-end">
                    <button className="btn-close btn-close-cita" data-bs-dismiss="offcanvas"></button>
                </div>
                {cita.asunto && <div className="offcanvas-body">
                    <div className="card p-3 ">

                        <p className="h4">
                            <div className="row">
                                <dt className="col-4"><span className='me-2'>Cita:</span></dt>
                                <dd className="col "><span className={`badge text-bg-${colorBadge}`}>{new Date(cita.fechaHoraI).toLocaleString().slice(-9, -3)}</span>
                                    <i className="fa-solid fa-arrow-right mx-2"></i>
                                    <span className={`badge text-bg-${colorBadge}`}>{new Date(cita.fechaHoraF).toLocaleString().slice(-9, -3)}</span></dd>
                            </div>

                            


                        </p>

                        <div className=""></div>
                        <hr />
                        {/* <p className='h6'>Asunto: {cita.asunto}</p>
                        <p className='h6'>Médico: {cita.médico}</p>
                        <p className='h6 mb-3'>Consultorio: {cita.consultorio}</p> */}

                        <div className="row">
                            <dt className="col-6">Fecha:</dt>
                            <dd className="col-6 small"><span className="badge text-bg-warning">{new Date(cita.fechaHoraI).toLocaleDateString()}</span></dd>
                            
                            <dt className="col-6">Paciente:</dt>
                            <dd className="col-6 small">{cita.paciente}</dd>

                            <dt className="col-6">Médico:</dt>
                            <dd className="col-6 small">{cita.médico}</dd>

                            <dt className="col-6">Consultorio:</dt>
                            <dd className="col-6">{cita.consultorio}</dd>

                            <dt className="col-6">Asunto:</dt>
                            <dd className="col-6 small">{cita.asunto}</dd>

                            <dt className="col-6">Status:</dt>
                            <dd className="col-6 mb-0"><span className={`badge text-bg-${colorBadge}`}>{cita.status}</span></dd>
                        </div>
                        {props.user.role !== "PACIENTE" && <div className="">
                          <hr />
                          <div className="row mb-3">
                              <div className="col-12 d-flex justify-content-evenly">
                                  <select name="" id='status-cita' className='form-select'>
                                      <option hidden selected value="">Actualizar Status...</option>
                                      <option value="PENDIENTE">PENDIENTE</option>
                                      <option value="CONFIRMADA">CONFIRMADA</option>
                                      <option value="EN PROGRESO">EN PROGRESO</option>
                                      <option value="REALIZADA">REALIZADA</option>
                                      <option value="NO REALIZADA">NO REALIZADA</option>
                                      <option value="CANCELADA">CANCELADA</option>
                                  </select>
                                  <button className='btn btn-outline-success' onClick={handleUpdateStatus}><i className="fa-solid fa-arrow-right"></i></button>
                              </div>
                          </div>
                          <div className="card-footer pt-3 bg-body d-flex justify-content-evenly">
                              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteCita(cita._id)}><i className="fa-solid fa-trash me-2"></i>Borrar</button>
                          </div>
                        </div>}

                    </div>
                </div>}
            </div>

        </div>
    )
}

export default DetailCita
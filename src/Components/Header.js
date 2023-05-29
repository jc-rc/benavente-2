import React from 'react'

function Header(props) {


    const handleSignOut = ()=>{
        console.log("Bye")
        window.location.reload()
    }

  return (
    <div className="row d-flex align-items-center mb-4">
                <div className="col-sm-6 col-2 text-start px-4 mb-1">
                    {/* <p className="h1 m-0"> <img src="https://www.benaventedental.com.mx/assets/images/logo.svg" className='image-fluid' width={40} height={40} alt="" /> Benavente</p> */}
                    <img className='img-fluid d-md-block d-none' style={{height: 80}}  alt="" src="./logoBenaLargo.svg"/>
                    <img className=' d-md-none d-block' style={{height: 40}}  alt="" src="./logoBena_80.svg"/>
                    {/* <p className="small mb-3 fst-italic">Plataforma de Control de Citas</p> */}
                </div>
                <div className="col-sm-6 col-10  text-end">
                    <div className="d-flex float-end align-items-center">
                        <p className="m-0 me-4">Bienvenido(a), <span className="fw-bold">{props.user.nombre} {props.user.aPaterno}</span></p>
                        {/* <button className="btn btn-outline-primary me-3" id='btn-refresh' onClick={handleRefresh}><i className="fa-solid fa-rotate"></i></button> */}
                        <button className="btn btn-outline-danger" onClick={handleSignOut}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                    </div>
                </div>
                <hr />
            </div>
  )
}

export default Header
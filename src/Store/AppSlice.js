import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuarios: [],
    citas: [],
    ventas: [],
    pacientes: [],
    médicos: [],
    sTermUsuarios: "",
    sTermCitas: "",
    sTermVentas: "",
    viewUsuario: {},
    viewCita: {},
    viewVenta: {},
    dummyU: 0,
    dummyC: 0,
    dummyV: 0,
}


export const appSlice = createSlice(
    {
        name: "app",
        initialState,
        reducers:{
            setUsuarios : (state, action)=>{
                state.usuarios = action.payload
            },
            setCitas : (state, action)=>{
                state.citas = action.payload
            },
            setVentas : (state, action)=>{
                state.ventas = action.payload
            },
            setPacientes : (state, action)=>{
                state.pacientes = action.payload
            },
            setMédicos : (state, action)=>{
                state.médicos = action.payload
            },
            setSTermUsuarios : (state, action)=>{
                state.sTermUsuarios = action.payload
            },
            setSTermCitas : (state, action)=>{
                state.sTermCitas = action.payload
            },
            setSTermVentas : (state, action)=>{
                state.sTermVentas = action.payload
            },
            setViewUsuario : (state, action)=>{
                state.viewUsuario = action.payload
            },
            setViewCita : (state, action)=>{
                state.viewCita = action.payload
            },
            setViewVenta : (state, action)=>{
                state.viewVenta = action.payload
            },
            setDummyU : (state, action)=>{
                state.dummyU +=1
            },
            setDummyC : (state, action)=>{
                state.dummyC +=1
            },
            setDummyV : (state, action)=>{
                state.dummyV +=1
            },
            
        }
    }
)

export const {setUsuarios, setCitas, setVentas,setPacientes, setMédicos, setSTermUsuarios, setSTermCitas, setSTermVentas, setViewUsuario, setViewCita, setViewVenta, setDummyU, setDummyC, setDummyV} = appSlice.actions

export default appSlice.reducer
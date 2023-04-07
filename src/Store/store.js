import { configureStore } from "@reduxjs/toolkit";
import appSliceReducer from "./AppSlice"

export const store = configureStore({
    reducer: {
        app: appSliceReducer
    }
})


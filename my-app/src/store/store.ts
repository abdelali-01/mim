import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth/authSlice'
import errorReducer from './error/errorSlice'


export const store = configureStore({
    reducer : {
        auth : authReducer ,
        error : errorReducer ,
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch ;
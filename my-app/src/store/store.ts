import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth/authSlice'
import errorReducer from './error/errorSlice'
import alertReducer from './alert/alertSlice';
import notebookReducer from './notebooks/notebookSlice';
import accountReducer from './accounts/accountsSlice';
import cashRegisterReducer from './cash-register/cashRegisterSlice';
import trodatRegisterReducer from './trodat-register/trodatRegisterSlice';
import calendarReducer from './calendar/calendarSlice';

export const store = configureStore({
    reducer : {
        auth : authReducer ,
        error : errorReducer ,
        alert : alertReducer ,
        notebooks : notebookReducer ,
        accounts : accountReducer,
        cashRegister : cashRegisterReducer ,
        trodatRegister : trodatRegisterReducer ,
        calendar : calendarReducer ,
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch ;
import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth/authSlice'
import errorReducer from './error/errorSlice'
import alertReducer from './alert/alertSlice';
import notebookReducer from './notebooks/notebookSlice';
import accountReducer from './accounts/accountsSlice';
import cashRegisterReducer from './cash-register/cashRegisterSlice';

export const store = configureStore({
    reducer : {
        auth : authReducer ,
        error : errorReducer ,
        alert : alertReducer ,
        notebooks : notebookReducer ,
        accounts : accountReducer,
        cashRegister : cashRegisterReducer 
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch ;
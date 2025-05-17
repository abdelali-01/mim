import axios from "axios";
import { setError } from "../error/errorSlice";
import { AppDispatch } from "../store";
import { setAccounts } from "./accountsSlice";
import { setSuccessAlert } from "../alert/alertSlice";

const server = process.env.NEXT_PUBLIC_SERVER;

export const fetchAccounts = ()=> async (dispatch:AppDispatch) => {
    try {
        const res = await axios.get(`${server}/api/auth/admins` , {withCredentials : true});
        
        if(res.statusText === 'OK'){
            dispatch(setAccounts(res.data.admins));
        }
    } catch (error) {
        console.log('error during fetching the accounts' , error);
        dispatch(setError({
            message : error.response?.data.message || error.message
        }));
    }
}

export const deleteAccounts = (id : string) => async (dispatch:AppDispatch) => {
    try {
        await axios.delete(`${server}/api/auth/${id}` ,{withCredentials : true});
        dispatch(setSuccessAlert('Account has been deleted .'));
        
        dispatch(fetchAccounts());
        setTimeout(() => {
            dispatch(setSuccessAlert(null));
        }, 3000);

    } catch (error) {
        console.log('error deliting account' , error)
        dispatch(setError({
            message : error.response?.data.message || error.message
        }))
    }
}
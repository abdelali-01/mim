import axios from "axios";
import { setError } from "../error/errorSlice";
import { AppDispatch } from "../store";
import { setAccounts } from "./accountsSlice";

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
            message : error.response.data.message || error.message
        }));
    }
}
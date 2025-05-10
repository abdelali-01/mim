import axios from "axios";
import { AppDispatch } from "../store";
import { setIsLoading, setNotebooks } from "./notebookSlice";

const server = process.env.NEXT_PUBLIC_SERVER;


export const fetchNotebooks = () => async (dispatch:AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
        const res = await axios.get(`${server}/api/notebooks`, {withCredentials : true});
        if(res.statusText === 'OK'){
            dispatch(setNotebooks(res.data))
        }
    } catch (error) {
        console.log('Error during fetching the notebooks' , error);
        
    }finally {
        dispatch(setIsLoading(false));
    }
}
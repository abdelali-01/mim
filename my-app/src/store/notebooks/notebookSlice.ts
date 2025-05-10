import { createSlice } from "@reduxjs/toolkit";
import { Notebook} from "../../../public/types";



const initialState : {
    notebooks : Notebook[] | null;
    isLoading : boolean ;
    selectedNotebook : Notebook | null
} = {
    notebooks : null ,
    selectedNotebook : null ,
    isLoading : false 
}

const notebookSlice = createSlice({
    name : 'notebooks',
    initialState,
    reducers : {
        setNotebooks : (state , action) =>{
            state.notebooks = action.payload ;
        },
        setSelectedNotebook : (state , action) => {
            state.selectedNotebook = action.payload ;
        },
        setIsLoading : (state , action)=> {
            state.isLoading = action.payload ;
        }
    }
});

export const {setNotebooks , setSelectedNotebook , setIsLoading} = notebookSlice.actions ;
export default notebookSlice.reducer ;
import { createSlice } from "@reduxjs/toolkit";

export interface RemovedItem {
    _id?: string
    note: string;
    some: number | null;
}

export interface CashRegisterPageItem {
    _id?: string;
    title: string;
    category: 'F' | 'T';
    price: number |null ;
}

export interface CashRegisterPage {
    _id?: string;
    date: Date | string;
    removed: RemovedItem[];
    total: number;
    t_total: number;
    f_total: number;
    items: CashRegisterPageItem[];
}

interface StateType {
    cashRegisterPages : CashRegisterPage[] | null ;
    selectedPage : CashRegisterPage | null ;
}

const initialState : StateType = {
    cashRegisterPages : null ,
    selectedPage : null 
}

const cashRegisterSlice = createSlice({
    name : 'cash-register' ,
    initialState ,
    reducers : {
        setCashRegisterPages : (state , action ) => {
            state.cashRegisterPages = action.payload ;
        },
        setSelectedPage : (state , action)=>{
            state.selectedPage = action.payload ;
        }
    }
});

export const {setCashRegisterPages , setSelectedPage} = cashRegisterSlice.actions ;
export default cashRegisterSlice.reducer ;
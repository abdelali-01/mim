import { createSlice } from "@reduxjs/toolkit";

export interface RemovedItem {
    _id?: string
    note: string;
    some?: number;
}

export interface CashRegisterPageItem {
    _id?: string;
    title: string;
    category: 'F' | 'T' | string;
    price?: number;
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

interface Register {
    _id: string;
    total: number;
    t_total: number;
    f_total: number;
}

interface StateType {
    registers: Register[] | null;
    cashRegisterPages: CashRegisterPage[] | null;
    selectedPage: CashRegisterPage | null;
    statistic : {total : number ; isUp : boolean ; monthlySeries : number[]} | null ;
}

const initialState: StateType = {
    registers: null,
    cashRegisterPages: null,
    selectedPage: null,
    statistic : null ,
}

const cashRegisterSlice = createSlice({
    name: 'cash-register',
    initialState,
    reducers: {
        setCashRegisterPages: (state, action) => {
            state.cashRegisterPages = action.payload;
        },
        setRegisters: (state, action) => {
            state.registers = action.payload
        },
        setSelectedPage: (state, action) => {
            state.selectedPage = action.payload;
        },
        setCashRegisterStatistic : (state , action)=>{
            state.statistic = action.payload ;
        }
    }
});

export const { setCashRegisterPages, setSelectedPage, setRegisters , setCashRegisterStatistic} = cashRegisterSlice.actions;
export default cashRegisterSlice.reducer;
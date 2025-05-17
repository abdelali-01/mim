import { createSlice } from "@reduxjs/toolkit";

export interface TrodatOrder {
  _id?: string;
  destination: string;
  model: string;
  quantity: number;
  price?: number;
  total?: number;
  prePayment: number;
  isCompleted: boolean;
  isDelivered: boolean;
  phone?: string;
  email?: string
}

export interface TrodatRegisterPage {
  _id?: string;
  date: Date | string;
  trodatSells: number;
  total: number;
  orders: TrodatOrder[];
}

export interface TrodatRegister {
  _id: string;
  trodatSells: number;
  total: number;
}

export interface StockTable {
  _id: string;
  table: { _id?: string; model: string; price: number; quantity: number }[];
  quantity: number;
}

interface StateType {
  registers: TrodatRegister[] | null;
  trodatRegisterPages: TrodatRegisterPage[] | null;
  selectedPage: TrodatRegisterPage | null;
  stockTable: StockTable | null;
  statistic: { trodatSells: { current: number, isUp: boolean }; total: { current: number, isUp: boolean } } | null
}

const initialState: StateType = {
  registers: null,
  trodatRegisterPages: null,
  selectedPage: null,
  stockTable: null,
  statistic : null
};

const trodatRegisterSlice = createSlice({
  name: "trodat-register",
  initialState,
  reducers: {
    setTrodatRegisterPages: (state, action) => {
      state.trodatRegisterPages = action.payload;
    },
    setTrodatRegisters: (state, action) => {
      state.registers = action.payload;
    },
    setSelectedTrodatPage: (state, action) => {
      state.selectedPage = action.payload;
    },
    setStockTable: (state, action) => {
      state.stockTable = action.payload
    },
    setTrodatStatistic : (state, action)=>{
      state.statistic = action.payload 
    }
  },
});

export const {
  setTrodatRegisterPages,
  setTrodatRegisters,
  setSelectedTrodatPage,
  setStockTable,
  setTrodatStatistic
} = trodatRegisterSlice.actions;

export default trodatRegisterSlice.reducer;

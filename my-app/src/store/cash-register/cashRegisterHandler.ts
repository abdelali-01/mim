import axios from "axios";
import { setError } from "../error/errorSlice";
import { AppDispatch } from "../store";
import { CashRegisterPage, CashRegisterPageItem, RemovedItem, setCashRegisterPages, setCashRegisterStatistic, setRegisters, setSelectedPage } from "./cashRegisterSlice";
import { setSuccessAlert } from "../alert/alertSlice";
import { ParamValue } from "next/dist/server/request/params";
import { setTrodatStatistic } from "../trodat-register/trodatRegisterSlice";

const server = process.env.NEXT_PUBLIC_SERVER;

export const addCashRegisterPage = () => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.post(`${server}/api/cash-register`, {}, { withCredentials: true });
        console.log(res);

        if (res.statusText === 'Created') {
            dispatch(setSuccessAlert('Your Page has benn added successfully'))

            dispatch(fetchCashRegisterPages());
            setTimeout(() => {
                dispatch(setSuccessAlert(null));
            }, 3000);
        }
    } catch (error) {
        console.log('Error during adding the page', error);
        dispatch(setError({
            message: error.response?.data.message || error.message
        }))
    }
};

export const fetchCashRegisterPages = () => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get(`${server}/api/cash-register`, { withCredentials: true });

        if (res.statusText === 'OK') {
            const pages = res.data.pages;
            if (pages.length < 1) {
                dispatch(setCashRegisterPages(pages));
            } else {
                const sorted = [...pages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                dispatch(setCashRegisterPages(sorted));
            }
            dispatch(setRegisters(res.data.registers));
        }
    } catch (error) {
        console.log('Error during getting the cash register pages', error);
        dispatch(setError({
            message: error.response?.data.message || error.message
        }))
    }
}

export const findCashRegisterPage = (pages: CashRegisterPage[], pageId: ParamValue) => async (dispatch: AppDispatch) => {
    try {
        const findedPage = pages.find(page => {
            return page._id == pageId
        });
        if (findedPage) dispatch(setSelectedPage(findedPage));

    } catch (error) {
        console.log('error during finding a register page', error);
        dispatch(setError({
            message: error.response?.data.message || error.message
        }));
    }
}

interface UpdatePayload {
    pageId: string | ParamValue;
    addItem?: Omit<CashRegisterPageItem, '_id'>;
    addRemoved?: Omit<RemovedItem, '_id'>;
    deleteItemId?: string;
    deleteRemovedId?: string;
    updateItem?: CashRegisterPageItem;
    updateRemoved?: RemovedItem;
}

export const updateCashRegisterPage = (payload: UpdatePayload) => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.put(`${server}/api/cash-register/${payload.pageId}`, payload, {
            withCredentials: true,
        });

        dispatch(setSuccessAlert('Page updated successfully'));
        dispatch(fetchCashRegisterPages()); // re-fetch to reflect updated state

        setTimeout(() => {
            dispatch(setSuccessAlert(null));
        }, 3000);

    } catch (error) {
        console.error('Error updating page:', error);
        dispatch(
            setError({
                message: error.response?.data?.message || error.message,
            })
        );
    }
};


export const deleteCashRegisterPage = (pageId: ParamValue | string) => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.delete(`${server}/api/cash-register/${pageId}`, { withCredentials: true });
        console.log(res);

        if (res) {
            dispatch(setSuccessAlert('You page has been deleted successfully'));
            dispatch(fetchCashRegisterPages());

            setTimeout(() => {
                dispatch(setSuccessAlert(null));
            }, 3000);
        }
    } catch (error) {
        console.error('Error deleting page:', error);
        dispatch(
            setError({
                message: error.response?.data?.message || error.message,
            })
        );
    }
}


export const fecthStatistic = () => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get(`${server}/api/statistic` , {withCredentials : true});

        dispatch(setTrodatStatistic(res.data.trodat));
        dispatch(setCashRegisterStatistic(res.data.cashRegister));
    } catch (error) {
        console.error('Error with fetching statistic:', error);
        dispatch(
            setError({
                message: error.response?.data?.message || error.message,
            })
        );
    }
}
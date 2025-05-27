import axios from "axios";
import { AppDispatch } from "../store";
import { setError } from "../error/errorSlice";
import { setSuccessAlert } from "../alert/alertSlice";
import {
  TrodatOrder,
  TrodatRegisterPage,
  setTrodatRegisterPages,
  setTrodatRegisters,
  setSelectedTrodatPage,
  setStockTable,
} from "./trodatRegisterSlice";
import { ParamValue } from "next/dist/server/request/params";

const server = process.env.NEXT_PUBLIC_SERVER;

// Create new page
export const addTrodatRegisterPage = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.post(`${server}/api/trodat-register`, {}, { withCredentials: true });
    console.log('res from adding trodat register page', res);

    if (res) {
      dispatch(setSuccessAlert("Your Page has been added successfully"));
      dispatch(fetchTrodatRegisterPages());
      setTimeout(() => dispatch(setSuccessAlert(null)), 3000);
    }
  } catch (error) {
    console.error("Error during adding the page:", error);
    dispatch(setError({ message: error.response?.data?.message || error.message }));
  }
};

// Fetch all pages
export const fetchTrodatRegisterPages = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get(`${server}/api/trodat-register`, { withCredentials: true });
    console.log('res from fetching trodat register pages', res);
    if (res.data) {
      const pages = res.data.pages;
      if (pages.length < 1) {
        dispatch(setTrodatRegisterPages(pages));
      } else {
        const sorted = [...pages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        dispatch(setTrodatRegisterPages(sorted));
      }
      dispatch(setTrodatRegisters(res.data.registers));
    }
  } catch (error) {
    console.error("Error fetching pages:", error);
    dispatch(setError({ message: error.response?.data?.message || error.message }));
  }
};

// Select specific page from memory
export const findTrodatRegisterPage = (pages: TrodatRegisterPage[], pageId: ParamValue) => async (dispatch: AppDispatch) => {
  try {
    const found = pages.find((page) => page._id === pageId);
    if (found) {
      const sortedOrders = [...found.orders].sort((a, b) => {
        const getPriority = (item: TrodatOrder) => {
          if (item.isDelivered) return 3;
          if (item.isCompleted) return 2;
          if ((item.price || 0) * (item.quantity || 1) === item.prePayment) return 1;
          return 0;
        };

        return getPriority(a) - getPriority(b); // ascending: low priority first
      });

      dispatch(setSelectedTrodatPage({ ...found, orders: sortedOrders }));
    }

  } catch (error) {
    console.error("Error finding the page:", error);
    dispatch(setError({ message: error.response?.data?.message || error.message }));
  }
};

interface UpdateTrodatPayload {
  pageId: string | ParamValue;
  addOrder?: Omit<TrodatOrder, "_id">;
  updateOrder?: TrodatOrder;
  removeOrderId?: string;
}

// Update a page: add / update / remove order
export const updateTrodatRegisterPage = (payload: UpdateTrodatPayload) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.put(`${server}/api/trodat-register/${payload.pageId}`, payload, {
      withCredentials: true,
    });

    dispatch(setSuccessAlert("Page updated successfully"));
    dispatch(fetchTrodatRegisterPages());

    setTimeout(() => {
      dispatch(setSuccessAlert(null));
    }, 3000);
  } catch (error) {
    console.error("Error updating page:", error);
    dispatch(setError({ message: error.response?.data?.message || error.message }));
  }
};


// Delete a page
export const deleteTrodatRegisterPage = (pageId: ParamValue | string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.delete(`${server}/api/trodat-register/${pageId}`, { withCredentials: true });

    if (res) {
      dispatch(setSuccessAlert("Page deleted successfully"));
      dispatch(fetchTrodatRegisterPages());

      setTimeout(() => dispatch(setSuccessAlert(null)), 3000);
    }
  } catch (error) {
    console.error("Error deleting page:", error);
    dispatch(setError({ message: error.response?.data?.message || error.message }));
  }
};


// trodat stock
export const fecthTrodatStockTable = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get(`${server}/api/tampon`, { withCredentials: true });
    dispatch(setStockTable(res.data));
  } catch (error) {
    console.log('error fetching Trodat stock table', error);
    setError({
      message: error.response?.data.message || error.message
    })
  }
}

export const updateTableStock = (table , id : string) => async (dispatch: AppDispatch) => {
  try {
    await axios.put(`${server}/api/tampon/${id}` , {table} , {withCredentials : true});

    dispatch(setSuccessAlert('Your stock has been updated'));
    dispatch(fecthTrodatStockTable());
    
    setTimeout(() => {
      dispatch(setSuccessAlert(null));
    }, 3000);
  } catch (error) {
    console.log('error updating Trodat stock table', error);
    setError({
      message: error.response?.data.message || error.message
    })
  }
}

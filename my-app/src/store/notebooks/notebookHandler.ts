import axios from "axios";
import { AppDispatch } from "../store";
import { setIsLoading, setNotebooks, setSelectedNotebook } from "./notebookSlice";
import { Notebook } from "../../../public/types";
import { setError } from "../error/errorSlice";
import { setSuccessAlert } from "../alert/alertSlice";
import { ParamValue } from "next/dist/server/request/params";

const server = process.env.NEXT_PUBLIC_SERVER;


export const fetchNotebooks = () => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
        const res = await axios.get(`${server}/api/notebooks`, { withCredentials: true });
        if (res) {
            dispatch(setNotebooks(res.data))
        }
    } catch (error) {
        console.log('Error during fetching the notebooks', error);
        dispatch(setError({
            message: error.response.data.message || error.message
        }));
    } finally {
        dispatch(setIsLoading(false));
    }
}

export const findNotebook = (notebooks: Notebook[], notebookId: string | string[]) => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
        const finded = notebooks.find(n => n._id == notebookId);
        if (finded) {
            dispatch(setSelectedNotebook(finded));
        }
    } catch (error) {
        console.log('error during find the notebook ', error);
        dispatch(setError({
            message: error.response.data.message || error.message
        }));
    } finally {
        dispatch(setIsLoading(false));
    }
}

export const updateNotebook = (formData: FormData, notebookId: ParamValue, closeModal: () => void) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.put(`${server}/api/notebooks/${notebookId}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res) {
      dispatch(fetchNotebooks());
      dispatch(setSuccessAlert("Your update has been successfully"));
      closeModal();
      setTimeout(() => dispatch(setSuccessAlert(null)), 3000);
    }
  } catch (error: any) {
    console.error("Error updating notebook item", error);
    dispatch(setError({
      message: error.response?.data?.message || error.message,
    }));
  }
};


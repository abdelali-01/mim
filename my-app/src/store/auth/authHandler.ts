import axios from 'axios';
import { setIsFeching, setUser } from './authSlice';
import { AppDispatch } from '../store';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { setError } from '../error/errorSlice';
import { User } from '@/components/auth/SignUpForm';
import { setSuccessAlert } from '../alert/alertSlice';
const server = process.env.NEXT_PUBLIC_SERVER;

export const registerUser = (user: User, clearFrom: () => void) => async (dispatch: AppDispatch) => {
    dispatch(setIsFeching(true));
    try {
        const res = await axios.post(`${server}/api/auth/signup`, user, { withCredentials: true });
        if (res) {
            console.log('client registred');
            dispatch(setSuccessAlert('Your client is registred successfully'))
            clearFrom();

            setTimeout(() => {
                dispatch(setSuccessAlert(null)); // Clear alert after 3 seconds
            }, 3000);
        }

    } catch (error) {
        console.log('Error during registring the user ', error);
        const errorDetails = {
            status: error.response?.data.status || 400,
            message: error.response?.data.message || error.message
        }
        dispatch(setError(errorDetails));
    } finally { dispatch(setIsFeching(false)) }
}

export const loggedIn = (user: { email: string, password: string }, router: AppRouterInstance) => async (dispatch: AppDispatch) => {
    dispatch(setIsFeching(true));
    try {
        const res = await axios.post(`${server}/api/auth/login`, user, { withCredentials: true });
        const userLogged = res.data?.user;
        if (userLogged) {
            dispatch(setUser(userLogged));
            if (userLogged.isAdmin)
                router.push('/admin')
            else router.push('/')
        }
    } catch (error) {
        console.log('error during the login', error);
        const errorDetails = {
            status: error.response?.data.status || 400,
            message: error.response?.data.message || error.message
        }
        dispatch(setError(errorDetails));
    } finally {
        dispatch(setIsFeching(false));
    }
}

export const checkIfLoggedIn = (pathname: string, router: AppRouterInstance) => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get(`${server}/api/auth`, { withCredentials: true });
        const userLogged = res.data?.user;
        if (userLogged) {
            dispatch(setUser(userLogged));
            if (pathname === '/signin' || pathname === '/') {
                if (userLogged.isAdmin) router.push('/admin')
                else router.push('/signin');
            }
        }

    } catch (error) {
        console.log('error during check if logged in', error);
    }
}

export const getUser = (userId: string | undefined) => async (dispatch: AppDispatch) => {
    if (!userId) return;
    try {
        const res = await axios.get(`${server}/api/auth/${userId}`, { withCredentials: true });

        if (res)
            dispatch(setUser(res.data))
    } catch (error) {
        console.log('error during getting the user', error);
        dispatch(setError({
            message: error.response?.data.message || error.message
        }))
    }
}

export const updateAccount = (userInfo: User) => async (dispatch: AppDispatch) => {
    try {
        await axios.put(`${server}/api/auth/${userInfo._id}`, userInfo, { withCredentials: true });

        dispatch(setSuccessAlert('Your Account has been updated successfully'));
        dispatch(getUser(userInfo._id));

        setTimeout(() => {
            dispatch(setSuccessAlert(null));
        }, 3000);

    } catch (error) {
        console.log('error during updating the account', error);
        dispatch(setError({
            message: error.response?.data.message || error.message
        }))
    }
}

export const loggedOut = (router: AppRouterInstance) => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.post(`${server}/api/auth/logout`, {}, { withCredentials: true });

        if (res.statusText === 'OK') {
            router.push('/signin')
        }
    } catch (error) {
        console.log('error during the login', error);
        const errorDetails = {
            status: error.response?.data.status,
            message: error.response?.data.message || error.message
        }
        dispatch(setError(errorDetails));
    }
}


export const SendEmailReset = (email: string, setState: () => void) => async (dispatch: AppDispatch) => {
    dispatch(setIsFeching(true))
    try {
        await axios.post(`${server}/api/auth/reset-password`, { email }, { withCredentials: true });
        setState();
    } catch (error) {
        dispatch(setError({
            message: error.response?.data.message || error.message
        }))
    } finally {
        dispatch(setIsFeching(false))
    }
}

export const sendPasswordResset = (password: string, token: string , router : AppRouterInstance) => async (dispatch: AppDispatch) => {
    try {
        await axios.post(`${server}/api/auth/reset-password/${token}` , {password} , {withCredentials : true});

        dispatch(setSuccessAlert('Your password has been updated'));
        router.push('/signin');
        
        setTimeout(() => {
            dispatch(setSuccessAlert(null));
        }, 3000);
    } catch (error) {
        dispatch(setError({
            message: error.response?.data.message || error.message
        }))
    }
}
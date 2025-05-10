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
        if(res){
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
            if (pathname === '/signin') {
                if (userLogged.isAdmin) router.push('/admin')
                else router.push('/');
            }
        }

    } catch (error) {
        console.log('error during check if logged in', error);
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
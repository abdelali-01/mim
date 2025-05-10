import { createSlice } from "@reduxjs/toolkit";

// {
//         username : 'abdelali' ,
//         email : 'aliaribi47@gmail.com',
//         phone : '0655878447',
//         isAdmin : true ,
//         role : 'super',
//  }

const initialState = {
    user : null ,
    isAdmin : true ,
    isFetching : false ,
}

const authSlice = createSlice({
    name : 'auth' ,
    initialState ,
    reducers : {
        setIsFeching : (state , action)=>{
            state.isFetching = action.payload
        },
        setUser : (state , action) => {
            state.user = action.payload ;
            state.isAdmin = action.payload.isAdmin ;
            state.isFetching = false
        },
    }
});

export const {setUser ,setIsFeching} = authSlice.actions ;
export default authSlice.reducer ;
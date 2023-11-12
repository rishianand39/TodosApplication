import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        currentUser : null,
        loading : false,
        error : false,
        isLoggedIn : false,
    },
    reducers : {
        setUser : (state, action)=>{
         state.currentUser = action.payload;
         state?.isLoggedIn = true;
         state.loading = false;
         state.error = null;   
        },
        logoutUser : (state)=>{
            state.currentUser = null;
            state.isLoggedIn = false;
            state.error = null;
            state.loading = false;

        },
        setLoginLoading : (state)=>{
            state.loading = true;
            state.error = null;
        },
        setLoginError : (state, action) =>{
            state.loading = false,
            state.error = action.payload
        },
    }
})

export const { setUser, logoutUser, setLoginLoading, setLoginError } = userSlice.actions;

export default userSlice.reducer;
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice"
export default configureStore({
    reducer : {
        user : userReducer,
        // Add other slices here if needed
    }
})

import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import notificationSlice from "./notificationSlice";
export default configureStore({
    reducer : {
        user : userReducer,
        notification : notificationSlice
        // Add other slices here if needed
    }
})

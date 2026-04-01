import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./assets/slices/authSlice";
import messageReducer  from "./assets/slices/messageSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        message:messageReducer,
    }
})
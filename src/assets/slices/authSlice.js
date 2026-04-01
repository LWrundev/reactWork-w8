import { createSlice } from "@reduxjs/toolkit";

//-- 處理 登入 / 登出
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        token:''
    },
    reducers: {
        login: (state,action)=>{
            state.isAuth = true;
            state.token = action.payload;
        },
        logout: (state,action)=>{
            state.isAuth = false,
            state.token = ''
        }
    }
});

export const { login,logout } =authSlice.actions;

export default authSlice.reducer;
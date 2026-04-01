import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: 'message',
    initialState: [

    ],
    reducers: {
        pushMsg: (state,action)=>{
            const id = Date.now();
            const {title,text,type} =action.payload;
            state.push({id , title , type, text});
        },
        removeMsg: (state,action)=>{
            const id = action.payload;
            const index = state.findIndex((msg)=> msg.id === id);
            if (index !== -1){
                state.splice(index,1);
            }
        },
    }
})

export const { pushMsg,removeMsg } = messageSlice.actions;
export default messageSlice.reducer;
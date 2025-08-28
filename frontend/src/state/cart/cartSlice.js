import { createSlice } from "@reduxjs/toolkit";

const initialCartState={
    itemCount:0,
    data:null
};

const cartSlice=createSlice({
    name:"Cart",
    initialState:initialCartState,
    reducers:{
        increaseItemCartCountByValue:(state,action)=>{
            state.itemCount += action.payload;
        }
    }
})

export const{
    increaseItemCartCountByValue
}=cartSlice.actions;

export default cartSlice.reducer;
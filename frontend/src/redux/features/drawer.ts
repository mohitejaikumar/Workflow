import { createSlice } from "@reduxjs/toolkit";
import { TodoType } from "../../utils/todos";


export interface DrawerState{
    isActive:boolean;
    status:TodoType;
}

const initialState:DrawerState = {
    isActive:false,
    status:"Not Selected",
}



export const drawerSlice = createSlice({
    name:"drawer",
    initialState:initialState,
    reducers:{
        openDrawer:(state,action)=>{
            state.isActive = true;
            state.status = action.payload;
        },
        closeDrawer:(state)=>{
            state.isActive = false;
            
        },
        
    }
})

export const {openDrawer,closeDrawer} = drawerSlice.actions;
export default drawerSlice.reducer;
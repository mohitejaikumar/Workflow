import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "workflo/utils/todos";


const initialState:{
    todos:Todo[];
}={
    todos:[]
};



export const todoSlice = createSlice({
    name:"todos",
    initialState:initialState,
    reducers:{
        addTodo:(state,action)=>{
            state.todos.push(action.payload);
        },
        addManyTodos:(state,action)=>{
            state.todos.push(...action.payload);
        },
        updateTodos:(state,action)=>{
            state.todos = action.payload;
            
            console.log("iurbfuiebwr",action.payload);
            
        },
        
    }
})

export const {addTodo,addManyTodos,updateTodos} = todoSlice.actions;
export default todoSlice.reducer;
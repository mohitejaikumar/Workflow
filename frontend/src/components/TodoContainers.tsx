"use client"
import { Todo, TodoType } from "workflo/utils/todos";
import TodoContainer from "./TodoContainer";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "workflo/redux/hooks";
import { updateTodos } from "workflo/redux/features/todos";
import { todo } from "node:test";
import axios from "axios";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useToast } from "./ui/use-toast";
import { CircleCheck } from "lucide-react";


const todoTypes:TodoType[] = ["To do","In progress","Under review","Finished"];
const PriorityOrder = {
    Urgent: 1,
    Medium: 2,
    Low: 3
};



export default function TodoContainers(){
    const todoState = useAppSelector(state=>state.todos);
    const dispatch = useAppDispatch();
    const {data:session}=useSession();
    const {toast} = useToast();
    

    const handleDrop= async (e:React.DragEvent<HTMLDivElement>,status:TodoType,targetRef:React.RefObject<HTMLDivElement>)=>{
        e.preventDefault();
        const taskDragedId = e.dataTransfer.getData("text/plain");
        targetRef.current?.classList.remove("bg-blue-300");
        dispatch(updateTodos(todoState.todos.map(todo=>{
            if(todo._id === taskDragedId){
                return {...todo,status};
            }
            else{
                return todo;
            }
        }).sort((a,b)=>PriorityOrder[a.priority]-PriorityOrder[b.priority])));
        
        try{
            const updatedTodo = todoState.todos.find(todo=>todo._id === taskDragedId);
            await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/updateTodo`,{
                id:updatedTodo?._id,
                status:status,
            },{
                headers:{
                    //@ts-ignore
                    Authorization:`${session?.user?.jwtToken}`,
                }
            })
            toast({
                title: (
                <div className=" flex gap-2 items-center font-bold">
                    <CircleCheck color="#05ff50" />
                    Successful
                </div>
                ) as any,
                duration:1000,
                description: `Status updated to - ${status}`,
            });
        }
        catch(err){
            message.error("Something went wrong");
        }
    }

    return(
        <div className="bg-white w-full h-fit rounded-md grid grid-cols-4 gap-3 mb-5 px-2 py-2">
        {
            todoTypes.map((it, index) => (
                <TodoContainer 
                    key={index} 
                    status={it} 
                    todos={todoState.todos.filter(todo => todo.status === it)} 
                    handleDrop={handleDrop} 
                    
                    
                />
            ))
        }
        </div>
    )
}
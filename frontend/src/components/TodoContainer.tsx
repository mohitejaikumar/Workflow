import Image from "next/image"
import MenuIcon from "../../public/menu.svg"
import { Todo, TodoType } from "workflo/utils/todos"
import TodoCard from "./TodoCard"
import PlusIcon from "../../public/plus.svg"
import { RefObject, useRef } from "react"
import { useAppDispatch } from "workflo/redux/hooks"
import { openDrawer } from "workflo/redux/features/drawer"

export default function TodoContainer({
    status,
    todos,
    handleDrop,
}:{
    status:TodoType,
    todos:Todo[],
    handleDrop:(e:React.DragEvent<HTMLDivElement>,status:TodoType,targetRef:React.RefObject<HTMLDivElement>)=>void,
}){

    const targetRef = useRef<HTMLDivElement>(null);

    const handleDragOver=(e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
        targetRef.current?.classList.add("bg-blue-400");
    }
    const handleDragLeave=(e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
        targetRef.current?.classList.remove("bg-blue-400");
    }
    const dispatch = useAppDispatch()
    return(
        <div 
        ref={targetRef}
        className="bg-white h-full col-span-1"
        onDrop={(e)=>{handleDrop(e,status,targetRef)}}
        onDragOver={(e)=>{handleDragOver(e)}}
        onDragLeave={(e)=>{handleDragLeave(e)}}
        >
            <div className="flex justify-between items-center px-4 py-2">
                <div>{status}</div>
                <Image src={MenuIcon} alt="menu" />
            </div>
            { todos.length > 0  && 
                todos.map((todo,index)=>{
                    return(
                        <TodoCard key={index} todo={todo} />
                    )
                })
            }
            <button 
            className="w-full flex justify-between py-1 bg-black text-gray-500 rounded-md my-2 px-2"
            onClick={()=>dispatch(openDrawer(status))}
            >
                <div>Add new</div>
                <Image src={PlusIcon} alt="plus" style={{backgroundColor:"black"}} />
            </button>
        </div>
    )
}
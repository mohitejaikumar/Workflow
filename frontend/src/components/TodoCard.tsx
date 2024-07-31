"use client"
import { Todo } from "workflo/utils/todos"
import Image from "next/image"
import ClockIcon from "../../public/clock.svg"
import { useRef } from "react"


const getColor = (priority:string) => {
    switch(priority){
        case "Urgent":
            return "bg-red-500"
        case "Medium":
            return "bg-yellow-500"
        case "Low":
            return "bg-green-500"
    }
}
const formatDateToYYYYMMDD = (date:string)=>{
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const getDate=(date1:Date,date2:string)=>{
    const date1Obj = date1;
    const date2Obj = new Date(date2);
    const diffInMilliSeconds = Math.abs(date1Obj.getTime() - date2Obj.getTime());
    const diffInHours = Math.floor(diffInMilliSeconds / 3600000);
    return diffInHours;
}




export default function TodoCard({
    todo
}:{
    todo:Todo
}){
    
    const dragRef = useRef<HTMLDivElement>(null);


    const handleDragStart=(e:React.DragEvent<HTMLDivElement>,todo:Todo,ref:React.RefObject<HTMLDivElement>)=>{
        // e.preventDefault();
        e.dataTransfer.setData("text/plain", todo._id);
        ref.current?.classList.add(...["bg-blue-200"]);
        
    }

    const handleDragEnd=(e:React.DragEvent<HTMLDivElement>,todo:Todo,ref:React.RefObject<HTMLDivElement>)=>{
        // e.preventDefault();
        e.dataTransfer.clearData();
        ref.current?.classList.remove(...["bg-blue-200"]);
    }
    const handleDrag=(e:React.DragEvent<HTMLDivElement>,todo:Todo,ref:React.RefObject<HTMLDivElement>)=>{
        e.preventDefault();
        console.log("drag over");
        // ref.current?.classList.remove("cursor-grab");
        // ref.current?.classList.add("cursor-grabbing");
    }

    return(
        <div 
        className="w-full h-fit rounded-md bg-[#edecf5fa] px-3 py-2 flex flex-col gap-3 my-3"
        ref={dragRef}
        draggable
        onDragStart={(e)=>{handleDragStart(e,todo,dragRef)}}
        onDragEnd={(e)=>{handleDragEnd(e,todo,dragRef)}}
        onDrag={(e)=>{handleDrag(e,todo,dragRef)}}
        >
            <div className="text-lg font-semibold text-wrap">{todo.title}</div>
            <div className="text-sm text-gray-600">{todo.description}</div>
            <div className={`${getColor(todo.priority)} px-2 py-1 rounded-md w-fit text-sm text-white`}>{todo.priority}</div>
            <div className="flex gap-2 items-center">
                <Image src={ClockIcon} alt="clock" />
                <div>{formatDateToYYYYMMDD(todo.deadline)}</div>
            </div>
            {/*@ts-ignore */}
            <div>{getDate(new Date(),todo.createdDate)} hr ago</div>
        </div>
    )
}
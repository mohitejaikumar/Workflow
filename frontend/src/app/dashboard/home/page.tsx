"use client"
import Image from "next/image";
import Dummy1Icon from "../../../../public/dummy1.svg";
import Dummy3Icon from "../../../../public/dummy3.svg";
import Dummy2Icon from "../../../../public/dummy2.svg";
import SearchIcon from "../../../../public/search.svg"
import CalenderIcon from "../../../../public/calander.svg"
import AutomationIcon from "../../../../public/automation.svg"
import ShareIcon from "../../../../public/share.svg"
import PlusIcon from "../../../../public/plus.svg"
import FilterIcon from "../../../../public/filter.svg"
import TodoContainers from "workflo/components/TodoContainers";
import { useAppDispatch, useAppSelector } from "workflo/redux/hooks";
import { openDrawer } from "workflo/redux/features/drawer";
import TodoDrawer from "workflo/components/TodoDrawer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import {  addManyTodos, updateTodos} from "workflo/redux/features/todos";


export default function Home(){

    const dispatch = useAppDispatch();
    const {data:session}=useSession();
    //@ts-ignore
    const token = session?.user?.jwtToken;

    useEffect(()=>{
        async function getTodos(){
            try{
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/getTodos`,{
                    headers:{
                        
                            Authorization:`${token}`,
                    }
                });
                
                dispatch(updateTodos([]));
                dispatch(addManyTodos(res.data));
            }
            catch(err){
                console.log(err);
            }
            
        }
        console.log(session);
        getTodos();
    },[token])


    return (
        <div className="px-3 py-5 w-full">
            <div className="flex justify-between ">
                <div className="text-3xl font-bold ">Good Morning, {session?.user?.name}!</div>
                <div className="pr-3">Help & feedback ?</div>
            </div>
            <div className="flex gap-3 flex-col sm:flex-row mt-5 justify-center">
                    <div className="flex items-center gap-4 bg-white w-1/3 py-3 px-5 rounded-md">
                        <Image src={Dummy1Icon} alt="dummy1" />
                        <div className="flex flex-col gap-1">
                            <div className="text-sm font-semibold">Introducing Tags</div>
                            <div className="text-wrap text-[12px] text-gray-600">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white w-1/3 py-3 px-5 rounded-md">
                        <Image src={Dummy2Icon} alt="dummy2" />
                        <div className="flex flex-col gap-1">
                            <div className="text-sm font-semibold">Share Notes Instantly</div>
                            <div className="text-wrap text-[12px] text-gray-600">Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white w-1/3 py-3 px-5 rounded-md">
                        <Image src={Dummy3Icon} alt="dummy3" />
                        <div className="flex flex-col gap-1">
                            <div className="text-sm font-semibold">Access Anywhere</div>
                            <div className="text-wrap text-[12px] text-gray-600">Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.</div>
                        </div>
                    </div>
                
            </div>
            <div className="flex justify-between mt-4">
                <div className="flex gap-3 my-2 bg-white px-2 py-1 rounded-md">
                    <input type="text" placeholder="Search" />
                    <Image src={SearchIcon} alt="search" />
                </div>
                <div className="flex gap-3">
                    <button className="mt-3 flex items-center gap-2 px-4  text-gray-600 rounded-md ">
                        <div>Calendar View</div>
                        <Image  src={CalenderIcon} alt="calender" />
                    </button>
                    <button className="mt-3 flex items-center gap-2 px-4  text-gray-600 rounded-md ">
                        <div>Automation</div>
                        <Image  src={AutomationIcon} alt="automation" />
                    </button>
                    <button className="mt-3 flex items-center gap-2 px-4  text-gray-600 rounded-md ">
                        <div>Filter</div>
                        <Image  src={FilterIcon} alt="filter" />
                    </button>
                    <button className="mt-3 flex items-center gap-2 px-4  text-gray-600 rounded-md ">
                        <div>Share</div>
                        <Image  src={ShareIcon} alt="share" />
                    </button>
                    <button 
                    className="bg-custom-blue-gradient mt-3 flex items-center gap-2 px-2 py-2  text-white rounded-md "
                    onClick={()=>dispatch(openDrawer("Not Selected"))}
                    >
                        <div className="text-sm">Create New</div>
                        <Image  src={PlusIcon} alt="plus" />
                    </button>
                    
                </div>
            </div>
            <div className="mt-4 mb-10">
                <TodoContainers  />
            </div>
            <TodoDrawer />
        </div>
    )
}
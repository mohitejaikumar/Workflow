"use client"
import Image from "next/image";
import NotificationIcon  from "../../public/notification.svg";
import ModeIcon from "../../public/mode.svg"
import ArrowIcon from "../../public/arrow.svg"
import HomeIcon from "../../public/home.svg"
import BoardsIcon from "../../public/boards.svg"
import SettingsIcon from "../../public/settings.svg"
import TeamsIcon from "../../public/teams.svg"
import AnalyticsIcon from "../../public/analytics.svg"
import PlusIcon from "../../public/plus.svg"
import { useRouter } from "next/navigation";
import { useAppDispatch } from "workflo/redux/hooks";
import { openDrawer } from "workflo/redux/features/drawer";
import { signOut, useSession } from "next-auth/react";
import ProfileIcon from "../../public/profile.svg"


export default function SideBar(){
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {data:session}=useSession();
    return (
        <div className="h-screen w-[15%]  bg-white px-3 py-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image src={ProfileIcon} alt="profile"/>
            <div className="text-xl font-semibold mt-2">
              {session?.user?.name}
            </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image src={NotificationIcon} alt="notification" className="cursor-pointer" />
                <Image src={ModeIcon} alt="mode" className="cursor-pointer" />
                <Image src={ArrowIcon} alt="arrow" className="cursor-pointer" />
              </div>
              <button 
              className="bg-[#edecf5fa] px-3 py-1 rounded-md text-sm"
              onClick={()=>{signOut({callbackUrl: "http://localhost:3000/auth/login/"})}}
              >
                Logout
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div 
              className="flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer hover:bg-[#edecf5fa] "
              onClick={() => router.push("/dashboard/home")}>
                <Image  src={HomeIcon} alt="home"  />
                <h1>Home</h1>
              </div>
              <div 
              className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-[#edecf5fa] cursor-pointer"
              onClick={() => router.push("/dashboard/boards")}>
                <Image  src={BoardsIcon} alt="boards"  />
                <h1>Boards</h1>
              </div>
              <div 
              className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-[#edecf5fa] cursor-pointer"
              onClick={() => router.push("/dashboard/settings")}>
                <Image  src={SettingsIcon} alt="settings"  />
                <h1>Settings</h1>
              </div>
              <div 
              className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-[#edecf5fa] cursor-pointer"
              onClick={() => router.push("/dashboard/teams")}
              >
                <Image  src={TeamsIcon} alt="teams" />
                <h1>Teams</h1>
              </div>
              <div 
              className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-[#edecf5fa] cursor-pointer"
              onClick={() => router.push("/dashboard/analytics")}
              >
                <Image  src={AnalyticsIcon} alt="analytics"  />
                <h1>Analytics</h1>
              </div>
            </div>
            <button 
            className="bg-custom-blue-gradient  text-white mt-3 flex items-center gap-4 px-4 py-2 rounded-md "
            onClick={()=>dispatch(openDrawer("Not Selected"))}
            >
              <div>Create new task</div>
              <Image  src={PlusIcon} alt="plus" />
            </button>
          </div>
      </div>
    )
}
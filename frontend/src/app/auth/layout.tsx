"use client"
import { Toaster } from "../../components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="bg-custom-gradient w-screen h-screen flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg border-2 ">
                <div className=" w-[30vw] h-fit flex flex-col items-center gap-3 px-7 py-4 justify-between rounded-md">
                {children} <Toaster />
                </div>
            </div>
        </div>
  );
}
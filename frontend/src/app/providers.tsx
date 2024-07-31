"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "workflo/components/ui/toaster";
import ReduxProvider from "workflo/redux/provider";


export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
       <ReduxProvider>
          {children} <Toaster />
        </ReduxProvider>
    </SessionProvider>
  );
};
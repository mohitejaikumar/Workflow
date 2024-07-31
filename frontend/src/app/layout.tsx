
import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "../font/Poppins";
import { Providers } from "./providers";


export const metadata: Metadata = {
  title: "WorkFlow!",
  description: "Your Personal Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className + " custom-scrollbar"}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
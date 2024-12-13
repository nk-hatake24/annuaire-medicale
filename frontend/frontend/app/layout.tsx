import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react"


export const metadata: Metadata = {
  title: "MedMeet",
  description: "find doctor, find hospital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"overflow-x-clip w-screen p-0 m-0 bg-slate-200"}>
        <NavBar />
        {children}
        <Footer/>
        </body>
    </html>
  );
}

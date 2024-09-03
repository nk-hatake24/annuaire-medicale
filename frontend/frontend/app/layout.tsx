import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navBar";
import Footer from "./components/footer";


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
      <body className={"overflow-x-clip"}>
        <NavBar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}

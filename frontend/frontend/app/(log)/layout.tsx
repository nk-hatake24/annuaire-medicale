import { ReactNode } from "react";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="h-screen relative ">
      <div
        className="h-full w-full   bg-cover brightness-50 bg-top contrast-100 absolute inset-0"
        style={{ backgroundImage: "url('/images/siginBG.jpeg')" }}
      >
      </div>
      <div className=" h-full flex items-center ">
        <div className="max-w-5xl md:mx-auto mx-4  p-8 bg-black/45 backdrop-blur-sm z-10 flex">
          {children}
        </div>
      </div>
    </div>
  );
}

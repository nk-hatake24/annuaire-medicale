import { ReactNode } from "react";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="h-screen w-screen relative ">
      <div
        className="h-full w-full   bg-cover brightness-50 bg-top contrast-100 absolute inset-0"
        style={{ backgroundImage: "url('/images/signinBG.webp')" }}
      >
      </div>
      <div className=" h-full w-full flex items-center ">
        <div className="w-full md:mx-60 mx-4   bg-white/15 backdrop-blur-sm z-10 flex">
          {children}
        </div>
      </div>
    </div>
  );
}

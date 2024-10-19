import DashboardNavBar from "@/components/dashboardNavBar";
import SideBarDashboard from "@/components/sidebar";
import { ReactNode } from "react";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="h-screen w-screen ">
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="w-1/4"> <SideBarDashboard /> </div>
        <div className="w-3/4  flex flex-col justify-center items-center"> <DashboardNavBar />
            <div>
                {children}
            </div>
         </div>


      </div>
    </div>
  );
}

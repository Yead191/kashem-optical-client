import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex font-lato overflow-x-scroll">
      <ScrollRestoration />
      <SidebarProvider>
        <AppSidebar />
        <main className="px-4 w-full  my-12 h-full ">
          <SidebarTrigger className="fixed top-2" />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;

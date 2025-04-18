import {
  ChevronsUpDown,
  Home,
  LayoutDashboard,
  LogOut,
  UserPen,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import UpdateProfile from "../UpdateProfile";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogOut = () => {
    logOut();
    toast.success("LoggedOut Successfully!");
    navigate("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip="My Account"
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={user?.photoURL}
                  alt={user?.name}
                />
                <AvatarFallback className="rounded-lg">KO</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.displayName || "No User"}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                  <AvatarFallback className="rounded-lg">KO</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={"/"}>
                <DropdownMenuItem>
                  <Home />
                  Go to Home
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={"/dashboard"}>
                <DropdownMenuItem>
                  <LayoutDashboard />
                  Dashboard
                </DropdownMenuItem>
              </Link>
              {user && (
                <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                  <UserPen />
                  Update Profile
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {user ? (
              <DropdownMenuItem onClick={handleLogOut}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            ) : (
              <Link to={"/login"}>
                <DropdownMenuItem>
                  <LogIn />
                  Log in
                </DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <UpdateProfile
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </SidebarMenu>
  );
}

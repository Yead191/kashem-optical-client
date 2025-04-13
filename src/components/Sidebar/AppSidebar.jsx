import {
  ChartNoAxesCombined,
  CreditCard,
  FileClock,
  FileSpreadsheet,
  Home,
  LayoutGrid,
  Logs,
  ScanEye,
  TicketSlash,
  UserRoundCog,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { GiMedicines } from "react-icons/gi";
import { MdLens, MdManageHistory } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";

import { Separator } from "../ui/separator";
import { Link, NavLink } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Store } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { NavUser } from "./NavUser";
import { FaTruck } from "react-icons/fa6";

const items = [
  {
    title: "Statistics",
    url: "/dashboard/admin/statistics",
    icon: ChartNoAxesCombined,
    role: "admin",
  },
  {
    title: "Sales Report",
    url: "/dashboard/admin/sales-report",
    icon: FileSpreadsheet,
    role: "admin",
  },
  {
    title: "Manage Users",
    url: "/dashboard/admin/manage-users",
    icon: UserRoundCog,
    role: "admin",
  },
  {
    title: "Manage Category",
    url: "/dashboard/admin/manage-category",
    icon: LayoutGrid,
    role: "admin",
  },
  {
    title: "Manage Products",
    url: "/dashboard/admin/manage-products",
    icon: Store,
    role: "admin",
  },
  {
    title: "Manage Orders",
    url: "/dashboard/admin/manage-orders",
    icon: FaTruck,
    role: "admin",
  },
  {
    title: "Manage Banner",
    url: "/dashboard/admin/manage-banners",
    icon: TicketSlash,
    role: "admin",
  },
  
  {
    title: "Manage Patient",
    url: "/dashboard/admin/manage-patient",
    icon: ScanEye,
    role: "admin",
  },

  // user routes

  {
    title: "Manage Cart",
    url: "/dashboard/manage-cart",
    icon: ShoppingCart,
    role: "user",
  },
  {
    title: "Purchase History",
    url: "/dashboard/purchase-history",
    icon: FileClock,
    role: "user",
  },
];

export function AppSidebar() {
  // const { role } = useRole();
  const role = "admin";
  const { state, toggleSidebar } = useSidebar();
  // console.log(state);
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <h2 className="font-bold my-4">
            {state === "collapsed" ? (
              <Link
                to="/"
                className="text-blue-400 text-xl font-bold"
                style={{ fontVariant: "small-caps" }}
              >
                <Typewriter
                  words={["KO"]}
                  loop={true}
                  cursor
                  cursorStyle="."
                  typeSpeed={100}
                  deleteSpeed={70}
                  delaySpeed={1000}
                />
              </Link>
            ) : (
              <Link
                style={{ fontVariant: "small-caps" }}
                to={"/"}
                className="text-blue-500 text-xl lg:text-2xl xl:text-[28px] font-bold lg:flex"
              >
                {/* Kashem <span className='text-blue-500 ml-1'> Optical</span> */}

                <Typewriter
                  words={["Kashem Optical", "KO"]}
                  loop={true}
                  cursor
                  cursorStyle="."
                  typeSpeed={90}
                  deleteSpeed={70}
                  delaySpeed={1000}
                />
              </Link>
            )}
          </h2>
          <SidebarGroupContent>
            <SidebarMenu id="sidebarmenus">
              {items.map((item) => {
                return role === item.role ? (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <NavLink
                        to={item.url}
                        className={"hover:text-blue-600 text-lg"}
                        end
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  ""
                );
              })}
              <div>
                <Separator />
              </div>
              <SidebarMenuItem className={"text-lg"}>
                <SidebarMenuButton tooltip={"Home"} asChild>
                  <NavLink to={"/"}>
                    <Home />
                    <span>{"Home"}</span>
                  </NavLink>
                </SidebarMenuButton>
                <SidebarMenuButton tooltip={"Products"} asChild>
                  <NavLink to={"/products"}>
                    <Store />
                    <span>{"Products"}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

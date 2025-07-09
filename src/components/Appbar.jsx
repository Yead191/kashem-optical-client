"use client";

import {
  ChevronRight,
  Menu,
  Search,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  Package,
  UserPenIcon,
} from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import UpdateProfile from "./UpdateProfile";
import CartDropdown from "./CartDropDown";
import useCart from "@/hooks/useCart";
import { toast } from "sonner";

const powerGlassTypes = [
  {
    name: "White plastic",
    options: ["Unifocal", "Bifocal moon", "Progressive", "Bifocal D"],
  },
  {
    name: "Photosun plastic",
    options: ["Unifocal", "Bifocal moon", "Progressive", "Bifocal D"],
  },
  {
    name: "Anti reflection plastic",
    options: ["Unifocal", "Bifocal moon", "Progressive", "Bifocal D"],
  },
  {
    name: "Blue cut plastic",
    options: ["Unifocal", "Bifocal moon", "Progressive", "Bifocal D"],
  },
  {
    name: "Photo Blue cut plastic",
    options: ["Unifocal", "Bifocal moon", "Progressive", "Bifocal D"],
  },
];

export default function AppBar() {
  const { user, logOut, updateUserProfile, setLoading, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState(3);
  const location = useLocation();
  const [cart, cartLoading, refetch] = useCart();

  const handleLogout = () => {
    toast.warning("Are you sure you want to log out?", {
      duration: 5000,
      description: "You will be logged out and redirected to the login page.",
      action: {
        label: "Logout",
        onClick: async () => {
          toast.promise(logOut(), {
            loading: "Signing Out...",
            success: () => {
              refetch();
              return <b>Logged Out Successfully!</b>;
            },
            error: (error) => error.message,
          });
        },
      },
    });
  };

  const pathname = location.pathname;

  const listStyle = `text-sm font-medium  hover:text-primary before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize `;
  const isActive = (path) => {
    return pathname === path ? "text-[#3B9DF8] " : "";
  };

  return (
    <header className=" w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="px-4 md:px-6   flex h-16 items-center justify-between lg:w-10/12 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-bold text-indigo-600">
            Kashem Optical
          </span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for glasses, frames, watches..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right Side - Desktop Navigation + Actions */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className={`${listStyle} ${isActive("/")}`}>
              Home
            </Link>

            {/* Shop Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center ${listStyle} ${isActive(
                  "/shop"
                )} `}
              >
                Shop
                <ChevronRight className="ml-1 h-3 w-3 rotate-90" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[800px] p-4">
                <div className="grid grid-cols-4 gap-6">
                  {/* Sunglass Column */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Sunglass</h4>
                    <div className="space-y-2">
                      <Link
                        to="/shop/sunglass/baby"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Baby Sunglass
                      </Link>
                      <Link
                        to="/shop/sunglass/ladies"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Ladies Sunglass
                      </Link>
                      <Link
                        to="/shop/sunglass/mens"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Men's Sunglass
                      </Link>
                    </div>
                  </div>

                  {/* Frame Column */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Frame</h4>
                    <div className="space-y-2">
                      <Link
                        to="/shop/frame/metal"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Metal Frame
                      </Link>
                      <Link
                        to="/shop/frame/shell"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Shell Frame
                      </Link>
                      <Link
                        to="/shop/frame/rimless"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Rimless Frame
                      </Link>
                      <Link
                        to="/shop/frame/premium"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Premium Frame
                      </Link>
                    </div>
                  </div>

                  {/* Power Glass Column */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Power Glass</h4>
                    <div className="space-y-2">
                      {powerGlassTypes.slice(0, 3).map((type) => (
                        <Link
                          key={type.name}
                          to={`/shop/power-glass/${type.name
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {type.name}
                        </Link>
                      ))}
                      <Link
                        to="/shop/power-glass"
                        className="block text-sm text-primary hover:underline"
                      >
                        View All →
                      </Link>
                    </div>
                  </div>

                  {/* Accessories Column */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Accessories</h4>
                    <div className="space-y-2">
                      <Link
                        to="/shop/watch"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Watch
                      </Link>
                      <Link
                        to="/shop/ring"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Ring
                      </Link>
                      <Link
                        to="/shop/bracelet"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Bracelet
                      </Link>
                      <Link
                        to="/shop/moneybag"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Moneybag
                      </Link>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/about" className={`${listStyle} ${isActive("/about")}`}>
              About Us
            </Link>

            <Link
              to="/contact"
              className={`${listStyle} ${isActive("/contact")}`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Shopping Cart */}
          <CartDropdown cart={cart}></CartDropdown>

          {/* User Profile / Login */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL} alt="User" />
                    <AvatarFallback>KO</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {" "}
                      {user?.displayName || user?.name || "No User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                  <UserPenIcon className="mr-2 h-4 w-4" />
                  <span>Update Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="hidden md:flex">
              <Button size="">Login</Button>
            </Link>
          )}

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden bg-transparent"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10"
                  />
                </div>

                {/* Mobile User Section */}
                <div className="flex items-center justify-between border-b pb-4">
                  {user ? (
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            user?.photoURL ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt="User"
                        />
                        <AvatarFallback>KO</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Link to="/login">
                      <Button size="md" className="w-full">
                        Login
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-2">
                  <Link
                    to="/"
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>

                  {/* Mobile Shop Menu */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-medium hover:text-primary">
                      Shop
                      <ChevronRight className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 pl-4">
                      {/* Sunglass */}
                      <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-medium hover:text-primary">
                          Sunglass
                          <ChevronRight className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 pl-4">
                          <Link
                            to="/shop/sunglass/baby"
                            className="block text-sm hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Baby Sunglass
                          </Link>
                          <Link
                            to="/shop/sunglass/ladies"
                            className="block text-sm hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Ladies Sunglass
                          </Link>
                          <Link
                            to="/shop/sunglass/mens"
                            className="block text-sm hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Men's Sunglass
                          </Link>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Frame */}
                      <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-medium hover:text-primary">
                          Frame
                          <ChevronRight className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 pl-4">
                          <Link
                            to="/shop/frame/metal"
                            className="block text-sm hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Metal Frame
                          </Link>
                          <Link
                            to="/shop/frame/shell"
                            className="block text-sm hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Shell Frame
                          </Link>
                          <Link
                            to="/shop/frame/rimless"
                            className="block text-sm hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Rimless Frame
                          </Link>
                          <Link
                            to="/shop/frame/premium"
                            className="block text-sm hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Premium Frame
                          </Link>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Power Glass */}
                      <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-medium hover:text-primary">
                          Power Glass
                          <ChevronRight className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2 pl-4">
                          {powerGlassTypes.map((type) => (
                            <Collapsible key={type.name}>
                              <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium hover:text-primary">
                                {type.name}
                                <ChevronRight className="h-3 w-3" />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="space-y-1 pl-4">
                                {type.options.map((option) => (
                                  <Link
                                    key={option}
                                    to={`/shop/power-glass/${type.name
                                      .toLowerCase()
                                      .replace(" ", "-")}/${option
                                      .toLowerCase()
                                      .replace(" ", "-")}`}
                                    className="block text-xs hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {option}
                                  </Link>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Watch */}
                      <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-medium hover:text-primary">
                          Watch
                          <ChevronRight className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 pl-4">
                          <Link
                            to="/shop/watch/ladies"
                            className="block text-sm hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Ladies Watch
                          </Link>
                          <Link
                            to="/shop/watch/mens"
                            className="block text-sm hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Men's Watch
                          </Link>
                          <Link
                            to="/shop/watch/baby"
                            className="block text-sm hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Baby Watch
                          </Link>
                        </CollapsibleContent>
                      </Collapsible>

                      <Link
                        to="/shop/ring"
                        className="block text-base font-medium hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Ring
                      </Link>
                      <Link
                        to="/shop/bracelet"
                        className="block text-base font-medium hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Bracelet
                      </Link>
                      <Link
                        to="/shop/moneybag"
                        className="block text-base font-medium hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Moneybag
                      </Link>
                    </CollapsibleContent>
                  </Collapsible>

                  <Link
                    to="/about"
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </Link>

                  {/* Mobile Logout */}
                  {user && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="mt-4"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* update profile modal */}
      {isModalOpen && (
        <UpdateProfile
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        ></UpdateProfile>
      )}
    </header>
  );
}

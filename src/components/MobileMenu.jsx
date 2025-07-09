import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { ChevronRight, LogOut, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Input } from "./ui/input";

export default function MobileMenu({
  isOpen,
  setIsOpen,
  user,
  handleLogout,
  powerGlassTypes,
}) {
  return (
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
          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-10" />
          </div>

          {/* Mobile User Section */}
          <div className="flex items-center justify-between border-b pb-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      user?.photoURL || "/placeholder.svg?height=32&width=32"
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
  );
}

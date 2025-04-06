import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const CartDropdown = ({ cart }) => {
  // Calculate the total price of items in the cart
  const totalPrice =
    cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <DropdownMenu>
      {/* Cart Icon with Badge */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart size={40} />
          {cart?.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs">
              {cart?.length || 0}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent className="w-64 p-0" align="end">
        <Card className="border-0 shadow-lg">
          {/* Header */}
          <DropdownMenuLabel className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">
                Cart ({cart?.length || 0} Items)
              </span>
              <span className="text-sm text-blue-600 font-medium">
                ৳{totalPrice.toFixed(2)}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Cart Items */}
          <CardContent className="p-0">
            {cart?.length > 0 ? (
              <ScrollArea className="h-48">
                {cart.map((item) => (
                  <DropdownMenuItem
                    key={item.productId}
                    className="flex items-center justify-between p-3 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.productName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.brandName}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">Your cart is empty</p>
              </div>
            )}
          </CardContent>

          {/* Footer with View Cart Button */}
          {cart?.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <CardFooter className="p-4">
                <Link to="/dashboard/cart" className="w-full">
                  <Button className="w-full">View Cart</Button>
                </Link>
              </CardFooter>
            </>
          )}
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartDropdown;

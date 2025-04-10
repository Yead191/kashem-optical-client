import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FaGlasses } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const ProductsDialog = ({ isOpen, setIsOpen, products, totalPrice }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className={"p-0"}>
      <DialogTrigger>
        <Button variant={"outline"} className={"cursor-pointer"}>
          <FaEye className="text-slate-700" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-4 pt-0 p-4 max-h-[600px] mt-3 overflow-y-auto">
          <h2 className="-ml-[2px] text-xl font-semibold flex items-center gap-2 mt-2">
            <FaGlasses /> Ordered List
          </h2>
          <Separator />
          <ul>
            {products.map((product) => (
              <li
                key={product.productId}
                className="flex justify-between py-2 border-b"
              >
                <div>
                  <h3 className="font-medium">{product.productName}</h3>
                  <p className="text-sm text-slate-500">
                    Brand: {product.brandName}
                  </p>
                  <p className="text-sm text-slate-500">
                    Quantity: {product.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Price: ৳{product.price}</p>
                  <p className="text-sm text-slate-500">
                    Subtotal: ৳{product.subtotal}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <h3 className="font-medium">Total Price</h3>
            <p className="font-semibold">৳{totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductsDialog;

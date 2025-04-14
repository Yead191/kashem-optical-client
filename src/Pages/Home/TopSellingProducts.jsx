import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useQuery } from "react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Link } from "react-router-dom";

function TopSellingProducts() {
  const axiosPublic = useAxiosPublic();
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic("/top-selling-products");
      return res.data;
    },
  });

  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + itemsToShow >= products.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? products.length - itemsToShow : prevIndex - 1
    );
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsToShow);

  

  return (
    <section className="w-full py-12 p-2 bg-white">
      <div className="md:w-11/12 lg:w-10/12 mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Top Selling Products</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <Link key={product.productId} to={`/product/${product.productId}`}>
              <Card className="overflow-hidden flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Badge for Total Quantity Sold */}
                  <span className="absolute top-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                    {product.totalQty} Sold
                  </span>
                </div>

                <CardContent className="p-4 flex-grow">
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                    {product?.productName}
                  </h3>
                  {/* Size and Additional Info */}
                  <p className="text-sm text-gray-500 mb-2 flex-grow">
                    Size: {product?.frameSize} • {product?.brandName}
                  </p>

                  {/* <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    ({product.rating})
                  </span>
                </div> */}
                  <p className="font-bold text-lg">
                    ৳{product.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopSellingProducts;

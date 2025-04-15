import { Star, ShoppingCart } from "lucide-react";

// import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "react-query";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

function LatestProducts() {
  //   const products = [
  //     {
  //       id: 1,
  //       name: "Hydra Comfort Contact Lenses",
  //       price: 54.99,
  //       rating: 4.5,
  //       image: "/placeholder.svg?height=300&width=300",
  //       link: "/product/hydra-comfort",
  //       isNew: true,
  //     },
  //     {
  //       id: 2,
  //       name: "Lightweight Rimless Glasses",
  //       price: 119.99,
  //       rating: 4.3,
  //       image: "/placeholder.svg?height=300&width=300",
  //       link: "/product/lightweight-rimless",
  //       isNew: true,
  //     },
  //     {
  //       id: 3,
  //       name: "Retro Round Sunglasses",
  //       price: 79.99,
  //       rating: 4.7,
  //       image: "/placeholder.svg?height=300&width=300",
  //       link: "/product/retro-round",
  //       isNew: true,
  //     },
  //     {
  //       id: 4,
  //       name: "Anti-Glare Reading Glasses",
  //       price: 69.99,
  //       rating: 4.4,
  //       image: "/placeholder.svg?height=300&width=300",
  //       link: "/product/anti-glare",
  //       isNew: true,
  //     },
  //     {
  //       id: 5,
  //       name: "Sports Performance Sunglasses",
  //       price: 99.99,
  //       rating: 4.6,
  //       image: "/placeholder.svg?height=300&width=300",
  //       link: "/product/sports-performance",
  //       isNew: true,
  //     },
  //     {
  //       id: 6,
  //       name: "Transition Photochromic Lenses",
  //       price: 149.99,
  //       rating: 4.8,
  //       image: "/placeholder.svg?height=300&width=300",
  //       link: "/product/transition-photochromic",
  //       isNew: true,
  //     },
  //   ];

  const axiosPublic = useAxiosPublic();
  const { data: products = [] } = useQuery({
    queryKey: ["latesr-products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/latest-products");
      return res.data;
    },
  });
  // console.log(products);

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="p-2 md:w-11/12 lg:w-10/12 mx-auto px-4">
        <h2 className="text-3xl font-bold text-start mb-8">
          Check Our Latest Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products?.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to={'/products'}>
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestProducts;

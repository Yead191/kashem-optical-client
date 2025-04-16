import React from "react";
import Seo from "../../components/Seo/Seo";
import BannerSlide from "../../components/BannerSlide";
import PopularProduct from "../../components/Popular Product/PopularProduct";

import Category from "../../components/Category";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GenderSection from "./GenderSection";
import CategoriesSection from "./CategoriesSection";
import TopSellingProducts from "./TopSellingProducts";
import LatestProducts from "./LatestProducts";
import Faq from "./Faq";
import Testimonials from "./Testimonials";

const Home = () => {
  // console.log(categories);
  return (
    <div className="">
      <Seo title={"Home | Kashem Optical"} />
      <BannerSlide></BannerSlide>
      {/* <div className="mb-6 text-center my-12 mx-auto">
                <h2 className="text-3xl xl:text-4xl font-bold pb-3">
                    Our <span className="text-blue-600">Categories</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Explore a diverse range of categories tailored to meet all your
                    needs. From everyday essentials to specialty items, find exactly
                    what you are looking for with ease!
                </p>
            </div>
            <div
                className="grid
         grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 gap-4 container mx-auto"
            >
                {categories?.map((category) => (
                    <Category category={category} key={category._id} />
                ))}
            </div>
            <PopularProduct></PopularProduct> */}
      {/* <div className="w-full bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Premium Eyewear Collection
          </h1>
          <p className="text-lg mb-8">
            Discover the perfect lenses for your style and vision needs
          </p>
          <Link to={'/products'}>
            <Button size="lg">Shop Now</Button>
          </Link>
        </div>
      </div> */}
      {/* shop by gender */}
      <GenderSection />
      {/* shop by categories */}
      <CategoriesSection />
      {/* top selling products */}
      <TopSellingProducts />
      {/* latest products */}
      <LatestProducts />
      {/* faq */}
      <Faq />
      {/* testimonials */}
      <Testimonials />
    </div>
  );
};

export default Home;

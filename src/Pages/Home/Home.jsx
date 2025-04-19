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
import BannerComponent from "./BannerComponent";

const Home = () => {
  // console.log(categories);
  return (
    <div className="">
      <Seo title={"Home | Kashem Optical"} content={"Discover premium lenses and eyewear at Kashem Optical. Shop stylish and affordable optical products designed for comfort and clarity."} link={'/'} />
      {/* banner 1 */}
      {/* <BannerSlide></BannerSlide> */}
      {/* banner2 */}
      <BannerComponent />
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

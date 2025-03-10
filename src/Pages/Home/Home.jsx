import React from 'react';
import Seo from '../../components/Seo/Seo';
import BannerSlide from '../../components/BannerSlide';
import PopularProduct from '../../components/Popular Product/PopularProduct';
import useCategory from '../../hooks/useCategory';
import Category from '../../components/Category';


const Home = () => {
    const [categories, categoriesLoading, refetch] = useCategory()
    // console.log(categories);
    return (
        <div className=''>
            <Seo title={"Home | Kashem Optical"} />
            <BannerSlide></BannerSlide>
            <div className="mb-6 text-center my-12 mx-auto">
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
            <PopularProduct></PopularProduct>

        </div>
    );
};

export default Home;
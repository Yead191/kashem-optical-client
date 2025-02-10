import React from 'react';
import Seo from '../../components/Seo/Seo';
import BannerSlide from '../../components/BannerSlide';
import PopularProduct from '../../components/Popular Product/PopularProduct';

const Home = () => {
    return (
        <div className='bg-base-200'>
            <Seo title={"Home | Kashem Optical"} />
            <BannerSlide></BannerSlide>
            <PopularProduct></PopularProduct>
        </div>
    );
};

export default Home;
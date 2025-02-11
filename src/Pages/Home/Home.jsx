import React from 'react';
import Seo from '../../components/Seo/Seo';
import BannerSlide from '../../components/BannerSlide';
import PopularProduct from '../../components/Popular Product/PopularProduct';

const Home = () => {
    return (
        <div className=''>
            <Seo title={"Home | Kashem Optical"} />
            <BannerSlide></BannerSlide>
            <PopularProduct></PopularProduct>
        </div>
    );
};

export default Home;
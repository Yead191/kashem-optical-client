import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Pagination, Navigation } from 'swiper/modules';

import banner1 from '../assets/banner/banner-1.webp'
import banner2 from '../assets/banner/banner-2.webp'
import banner3 from '../assets/banner/banner-3.webp'



const BannerSlide = () => {
    return (
        <div>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>

                    <div className="lg:h-[80vh]">
                        <img className="w-full h-full object-cover " src={banner1} alt="" />
                    </div>


                </SwiperSlide>
                <SwiperSlide>

                    <div className="lg:h-[80vh]">
                        <img className="w-full h-full object-cover " src={banner2} alt="" />
                    </div>


                </SwiperSlide>
                <SwiperSlide>

                    <div className="lg:h-[80vh]">
                        <img className="w-full h-full object-cover " src={banner3} alt="" />
                    </div>


                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default BannerSlide;
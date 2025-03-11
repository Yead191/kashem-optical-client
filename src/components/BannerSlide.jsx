import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import banner1 from '../assets/banner/banner-1.webp'
import banner2 from '../assets/banner/banner-2.webp'
import banner3 from '../assets/banner/banner-3.webp'
import { useQuery } from 'react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';



const BannerSlide = () => {
    const axiosPublic = useAxiosPublic()
    const { data: banners=[], } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/banners')
            const filtered = data.filter(item => item.status === "added")
            return filtered
        }
    })
    // console.log(banners);
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
                className="mySwiper lg:h-[70vh]"
            >
                {
                    banners?.map(banner =>
                        <SwiperSlide key={banner._id}>
                            <div className="">
                                <img className="w-full h-full object-cover  object-bottom" src={banner?.image} alt="" />
                            </div>
                        </SwiperSlide>
                    )
                }

            </Swiper>
        </div>
    );
};

export default BannerSlide;
import React from 'react';
import { useQuery } from 'react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { BaggageClaim } from 'lucide-react';

const Products = () => {
    const axiosPublic = useAxiosPublic()
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products')
            return res.data
        }
    })

    return (
        <div className='bg-base-100'>
            <div className="h-[140px]  bg-base-200  relative">
                <h1
                    className='text-3xl lg:text-4xl font-bold text-center  pt-8'>Products</h1>
                {/* <div className="join flex justify-center mt-8 mb-16">
                    <div>
                        <input
                            className="input input-bordered join-item md:min-w-96"
                            placeholder="Search By Language"
                            defaultValue={searchTerm}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="indicator">
                        <button onClick={handleSearch} className="btn join-item">
                            Search
                        </button>
                    </div>
                </div> */}
            </div>
            <div className='container mx-auto my-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2'>
                {
                    products?.map(product =>
                        <div class="rounded-xl bg-white shadow-lg hover:border hover:border-[#b21000] flex flex-col">
                            <img class="mx-auto pt-8 px-2 mb-7 object-cover h-[180px] md:h-[200px] lg:h-[260px]" src={product?.image} alt="" />
                            <div class="p-4 flex-grow">
                                <h4 class="text-xl font-bold mb-2">{product?.name}</h4>
                                <div className='flex items-center justify-between'>

                                <p class="text-[#b21000]">৳ <span className='text-xl font-semibold'>{product?.price}</span></p>
                                <p className='badge'>• {product?.category}</p>
                                </div>
                            </div>
                            <div className='w-11/12 mx-auto mb-4'>

                                {
                                    product?.status === "In Stock" ? <button className='btn w-full btn-sm flex items-center gap-2 hover:btn-neutral'>
                                        <BaggageClaim width={16} />
                                        Add to Cart
                                    </button> :
                                        <button disabled className='btn w-full btn-sm flex items-center gap-2 btn-error'>
                                            <BaggageClaim width={16} />
                                            Out of Stock
                                        </button>
                                }

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default Products;
import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from 'react-query';

const useCategory = () => {
    const axiosPublic = useAxiosPublic()
    const { data: categories = [], isLoading: categoriesLoading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categories')
            return res.data
        }
    })
    return [categories, categoriesLoading, refetch]
};

export default useCategory;
import React from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "react-query";

const useDiscount = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: discount = 0,
    isLoading: discountLoading,
    refetch,
  } = useQuery({
    queryKey: ["discount", user?.email],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosPublic(`/users/discount/${user?.email}`);
      return res.data.discountVoucher;
    },
  });
  return [discount, discountLoading, refetch];
};

export default useDiscount;

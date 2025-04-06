import React, { useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: cart = [],
    isLoading: cartLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      return res.data;
    },
  });
  return [cart, cartLoading, refetch];
};

export default useCart;

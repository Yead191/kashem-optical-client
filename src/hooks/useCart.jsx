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
    queryKey: ["cart", user?.email],
    enabled: !loading,
    queryFn: async () => {
      if (!user) {
        // Return cart from local storage for unauthenticated users
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        return localCart;
      }
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      return res.data;
    },
  });
  return [cart, cartLoading, refetch];
};

export default useCart;

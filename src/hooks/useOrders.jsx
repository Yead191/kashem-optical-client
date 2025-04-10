import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";
import { useContext } from "react";
import { AuthContext } from "@/Provider/AuthProvider";

const useOrders = () => {
  const { searchPhone, setSearchPhone } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", searchPhone],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders?search=${searchPhone}`);
      return data;
    },
  });
  return [orders, isLoading, refetch];
};

export default useOrders;

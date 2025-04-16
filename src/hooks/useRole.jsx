import React from "react";
import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role = null, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user?.email}`);
      return res.data.role;
    },
  });
  return { role, roleLoading };
};

export default useRole;

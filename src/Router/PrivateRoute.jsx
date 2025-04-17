import Spinner from "@/components/Spinner/Spinner";
import useAuth from "@/hooks/useAuth";
import React from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();
  // console.log(location);
  if (loading) {
    return <Spinner />;
  }
  if (
    user ||
    location.pathname === "/dashboard/manage-cart" ||
    location.pathname === "/dashboard/purchase-history"
  ) {
    return children;
  }
  if (!user) {
    toast.error("Please Login to Continue!");
  }
  return <Navigate to={"/login"} />;
};

export default PrivateRoute;

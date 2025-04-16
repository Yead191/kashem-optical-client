import Spinner from "@/components/Spinner/Spinner";
import useAuth from "@/hooks/useAuth";
import React from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();


  if (loading) {
    return <Spinner />;
  }
  if (user) {
    return children;
  }
  if (!user) {
    toast.error("Please Login to Continue!");
  }
  return <Navigate to={"/login"} />;
};

export default PrivateRoute;

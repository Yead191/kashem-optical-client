import Spinner from "@/components/Spinner/Spinner";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import React from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Spinner />;
  }
  if (user && role === "Admin") {
    return children;
  } else {
    toast.error("You don't have permission to visit Admin routes!");
  }

  return <Navigate to={"/"} />;
};

export default AdminRoute;

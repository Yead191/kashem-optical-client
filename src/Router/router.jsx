import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Root/root";
import Login from "../Pages/Login/Login";
import Register from "../components/Register/Register";
import Products from "../Pages/Products/Products";
import ManageUsers from "../Pages/Dashboard/AdminRoute/ManageUsers";
import ManageCategory from "../Pages/Dashboard/AdminRoute/ManageCategory";
import ManageProducts from "../Pages/Dashboard/AdminRoute/ManageProducts";
import Statistics from "../Pages/Dashboard/AdminRoute/Statistics";
import ManageBanners from "../Pages/Dashboard/AdminRoute/ManageBanners";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import ManageCart from "@/Pages/Dashboard/UserRoutes/ManageCart";
import DashboardLayout from "@/Root/Dashboard/DashboardLayout";
import ManageOrders from "@/Pages/Dashboard/AdminRoute/ManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
      },
    ],
  },
  // dashboard
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // admin routes
      {
        path: "admin/statistics",
        element: <Statistics></Statistics>,
      },
      {
        path: "admin/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "admin/manage-category",
        element: <ManageCategory></ManageCategory>,
      },
      {
        path: "admin/manage-products",
        element: <ManageProducts></ManageProducts>,
      },
      {
        path: "admin/manage-orders",
        element: <ManageOrders></ManageOrders>,
      },
      {
        path: "admin/manage-banners",
        element: <ManageBanners></ManageBanners>,
      },

      // user routes
      {
        path: "manage-cart",
        element: <ManageCart></ManageCart>,
      },
    ],
  },
]);

export default router;

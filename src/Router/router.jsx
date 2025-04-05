import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Root/root";
import Login from "../Pages/Login/Login";
import Register from "../components/Register/Register";
import DashboardIndex from "../Root/Dashboard/DashboardIndex";
import Products from "../Pages/Products/Products";
import ManageUsers from "../Pages/Dashboard/AdminRoute/ManageUsers";
import ManageCategory from "../Pages/Dashboard/AdminRoute/ManageCategory";
import ManageProducts from "../Pages/Dashboard/AdminRoute/ManageProducts";
import Statistics from "../Pages/Dashboard/AdminRoute/Statistics";
import ManageBanners from "../Pages/Dashboard/AdminRoute/ManageBanners";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

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
    element: <DashboardIndex></DashboardIndex>,
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
        path: "admin/manage-banners",
        element: <ManageBanners></ManageBanners>,
      },
    ],
  },
]);

export default router;

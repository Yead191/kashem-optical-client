import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login"
import Root from "../Root/Root.jsx";
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
import ManageOrders from "@/Pages/Dashboard/AdminRoute/ManageOrders/ManageOrders";
import Invoice from "@/components/Invoice/Invoice";
import ManagePatient from "@/Pages/Dashboard/AdminRoute/ManagePatient/ManagePatient";
import PurchaseHistory from "@/Pages/Dashboard/UserRoutes/PurchaseHisotry";
import SalesReport from "@/Pages/Dashboard/AdminRoute/SalesReport/SalesReport";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ContactPage from "@/Pages/Contact/Contact";
import AboutPage from "@/Pages/AboutUs/About";
import Error404Page from "@/Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error404Page />,
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
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "admin/statistics",
        element: (
          <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        ),
      },
      {
        path: "admin/sales-report",
        element: (
          <AdminRoute>
            <SalesReport />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-category",
        element: (
          <AdminRoute>
            <ManageCategory></ManageCategory>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-products",
        element: (
          <AdminRoute>
            <ManageProducts></ManageProducts>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-orders",
        element: (
          <AdminRoute>
            <ManageOrders></ManageOrders>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-banners",
        element: (
          <AdminRoute>
            <ManageBanners></ManageBanners>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-patient",
        element: (
          <AdminRoute>
            <ManagePatient></ManagePatient>
          </AdminRoute>
        ),
      },

      // user routes
      {
        path: "manage-cart",
        element: <ManageCart></ManageCart>,
      },
      {
        path: "purchase-history",
        element: <PurchaseHistory />,
      },
      {
        path: "invoice/:invoiceId",
        element: <Invoice></Invoice>,
      },
    ],
  },
]);

export default router;

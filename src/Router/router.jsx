import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Root/root";
import Login from "../Pages/Login/Login";
import Register from "../components/Register/Register";
import DashboardIndex from "../Root/Dashboard/DashboardIndex";
import Products from "../Pages/Products/Products";
import ManageUsers from "../Pages/Dashboard/AdminRoute/ManageUsers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/products',
                element: <Products></Products>
            },
        ]
    },
    // dashboard
    {
        path: '/dashboard',
        element: <DashboardIndex></DashboardIndex>,
        children:[
            // admin routes
            {
                path: 'admin/manage-users',
                element: <ManageUsers></ManageUsers>
            },
        ]
    },
]);

export default router
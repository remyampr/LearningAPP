import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../pages/user/Homepage";
import { UserLayout } from "../layout/UserLayout";
import { AboutPage } from "../pages/user/AboutPage";
import { Courses } from "../pages/user/Courses";
import { LoginPage } from "../pages/shared/LoginPage";
import { Signup } from "../pages/user/Signup";
import { CartPage } from "../pages/CartPage";
import { OrderSuccess } from "../pages/user/OrderSuccess";


export const router=createBrowserRouter([
    {
        path:"/",
        element:<UserLayout/>,
        errorElement:<h1>Error page</h1>,
        children:[
            {
                path:"",
                element:<Homepage/>
            },
            {
                path:"about",
                element:<AboutPage/>
            },
            {
                path:"courses",
                element: <Courses/>
            },
            {
                path:"cart",
                element: <CartPage/>
            },
            {
                path:"payment/success",
                element: <OrderSuccess/>
            },
            {
                path:"login",
                element:<LoginPage/>
            },
            {
                path:"signup",
                element: <Signup/>
            },
          
        ]
    },
 
])
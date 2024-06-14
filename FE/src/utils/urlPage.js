import Home from "../page/Home";
import Login from "../page/Login/login";
import Register from "../page/Register/register";
import ForgetPassword from "../page/ForgetPassword/forgetPassword";
import ResetPassword from "../page/ResetPassword/resetPassword";
import Account from "../page/Account/account";
import NotFound from "../page/NotFound";
import ChangePassword from "../page/ChangePassword/changepassword";
import OrderHistory from "../page/OrderHistory/orderHistory";

// Url pages in website
export const urlPages = [
    // Home page (0)
    {
        path: '',
        component: <Home />
    },

    // New products page (1)
    {
        path: 'new-products',
        component: ''
    },

    // Introduce page (2)
    {
        path: 'introduce',
        component: ''
    },

    // Contact page (3)
    {
        path: 'contact',
        component: ''
    },

    // Other page (4)
    {
        path: 'other',
        component: ''
    },

    // Sign in (5)
    {
        path: 'login',
        component: <Login />
    },

    // Sign out (6)
    {
        path: 'logout',
        component: ''
    },

    // Cart (7)
    {
        path: 'cart',
        component: ''
    },

    // Sign up (8)
    {
        path: 'register',
        component: <Register/>
    },

    // Forget password (9)
    {
        path: 'forget-password',
        component: <ForgetPassword/>
    },

    // Reset password (10)
    {
        path: 'reset-password/:token',
        component: <ResetPassword/>
    },

    // User information (11)
    { 
        path: 'account',
        component: <Account/>
    },

    // User order history(12)
    { 
        path: 'account/order-history',
        component: <OrderHistory/>
    },

    // User change password (13)
    { 
        path: 'account/change-password',
        component: <ChangePassword/>
    },

    // Not found URL page
    {
        path: '*',
        component: <NotFound />
    }
];
import Home from "../page/Home";
import Login from "../page/Login/login";
import Register from "../page/Register/register";
import ForgetPassword from "../page/ForgetPassword/forgetPassword";
import NotFound from "../page/NotFound";

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

    // Not found URL page
    {
        path: '*',
        component: <NotFound />
    }
];
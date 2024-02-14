import Home from "../page/Home";
import NotFound from "../page/NotFound";

// Url pages in website
export const urlPages = [
    // Home page (0)
    {
        path: '',
        component: <Home/>
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
        component: ''
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

    // Not found URL page
    { 
        path: '*',
        component: <NotFound/>
    }
];
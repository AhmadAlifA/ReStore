import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ProductDetails from "../../features/catalog/ProductDetail";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import Catalog from "../../features/catalog/Catalog";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import Orders from "../../features/orders/Orders";
import RequireAuth from "./RequireAuth";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
// import OrderDetails from "../../features/orders/OrderDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'checkout', element: <CheckoutWrapper />},
                {path: 'orders', element: <Orders />},
            ]},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'basket', element: <BasketPage />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            // {path: 'orderDetails/:id', element: <OrderDetails />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])
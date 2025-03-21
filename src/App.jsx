import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './ui/Home'
import Error from './ui/Error'
import Menu, { loader as menuLoader } from './features/menu/Menu'
import Cart from './features/cart/Cart'
import CreateOrder, {
    action as createOrderAction,
} from './features/order/CreateOrder'
import Order, { loader as orderLoader } from './features/order/Order'
import { action as updateOrderAction } from './features/order/UpdateOrder'
import AppLayout from './ui/AppLayout'

/// create React Router v6.4+
const router = createBrowserRouter([
    //  nested router
    {
        element: <AppLayout />,
        errorElement: <Error />,

        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/menu',
                element: <Menu />,
                // fetching data of loader và rendering Menu component at the same time
                loader: menuLoader,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/order/new',
                element: <CreateOrder />,

                action: createOrderAction,
            },
            {
                path: '/order/:orderId',
                element: <Order />,
                loader: orderLoader,
                errorElement: <Error />,
                action: updateOrderAction,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App

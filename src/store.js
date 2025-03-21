import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'

const store = configureStore({
    reducer: {
        user: userReducer, // store.user
        cart: cartReducer, // store.cart.cart
    },
})

export default store

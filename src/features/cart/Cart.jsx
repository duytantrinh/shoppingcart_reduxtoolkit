import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart } from './cartSlice'
import EmptyCart from './EmptyCart'

function Cart() {
    const cart = useSelector(getCart)
    const dispatch = useDispatch()

    const username = useSelector((store) => store.user.username)

    function handleClearCart() {
        dispatch(clearCart())
    }

    if (cart.length === 0) return <EmptyCart />

    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>

            <h2 className="mt-7 text-xl font-semibold">
                Your cart, {username}
            </h2>

            <ul className="my-8 space-y-6">
                {cart.map((item) => (
                    <CartItem item={item} key={item.pizzaId} />
                ))}
            </ul>

            <div className="my-8 flex gap-4 space-x-4">
                <Button to="/order/new" type="base">
                    Order pizzas
                </Button>

                <Button type="secondary" onClick={handleClearCart}>
                    🗑️ Clear cart
                </Button>
                <button className="cursor-pointer transition-all duration-500 hover:text-sky-500 hover:underline hover:underline-offset-8"></button>
            </div>
        </div>
    )
}

export default Cart

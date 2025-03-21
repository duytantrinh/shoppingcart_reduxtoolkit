import { formatCurrency } from '../../utils/helpers'
import DeleteItem from './DeleteItem'
import UpdateItemQuantity from './UpdateItemQuantity'
function CartItem({ item }) {
    const { pizzaId, name, quantity, totalPrice, unitPrice } = item

    return (
        <li className="flex flex-wrap items-center justify-between">
            <p className="mb-1">
                {quantity}&times; {formatCurrency(unitPrice)} - {name}
            </p>
            <div className="flex items-center justify-end gap-4">
                <p className="text-sm font-bold">
                    {formatCurrency(totalPrice)}
                </p>
                <UpdateItemQuantity
                    pizzaId={pizzaId}
                    quantity={quantity}
                ></UpdateItemQuantity>

                <DeleteItem pizzaId={pizzaId} />
            </div>
        </li>
    )
}

export default CartItem

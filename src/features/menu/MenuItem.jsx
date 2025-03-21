import { formatCurrency } from '../../utils/helpers'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, getCurrentQuantitybyId } from '../cart/cartSlice'

import DeleteItem from '../cart/DeleteItem'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'

function MenuItem({ pizza }) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza

    const currentQuantity = useSelector(getCurrentQuantitybyId(id))

    const dispatch = useDispatch()
    function handleAddToCart() {
        const newItem = {
            pizzaId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1,
        }
        dispatch(addItem(newItem))
    }

    return (
        <li className="flex gap-4 py-3">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 rounded-lg ${soldOut ? 'opacity-65 grayscale' : ''}`}
            />
            <div className="flex flex-1 flex-col">
                <p
                    className={`uppercase ${soldOut ? 'line-through decoration-red-400' : ''}`}
                >
                    {name}
                </p>

                <p className="text-sm capitalize italic text-stone-500">
                    {ingredients.join(', ')}
                </p>
                <div className="mt-auto flex w-full items-center justify-between sm:w-2/3">
                    {!soldOut ? (
                        <p className="text-md">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="uppercase text-slate-500">Sold out</p>
                    )}

                    {currentQuantity !== 0 && (
                        <div className="flex items-center justify-between gap-3 sm:gap-5 md:gap-8">
                            <UpdateItemQuantity
                                pizzaId={id}
                                quantity={currentQuantity}
                            />
                            <DeleteItem pizzaId={id} />
                        </div>
                    )}

                    {!soldOut && currentQuantity === 0 && (
                        <Button type="small" onClick={handleAddToCart}>
                            Add to cart
                        </Button>
                    )}
                </div>
            </div>
        </li>
    )
}

export default MenuItem

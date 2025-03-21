import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import EmptyCart from '../cart/EmptyCart'
import store from '../../store'
import { useState } from 'react'
import { formatCurrency } from '../../utils/helpers'
import { fetchAddress } from '../user/userSlice'

// https://uibakery.io/regex-library/phone-number

const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false)

    const {
        username,
        status: addressStatus,
        position,
        address,
        phone,
        error: errorAddress,
    } = useSelector((store) => store.user)

    const isLoadingAddress = addressStatus === 'loading'

    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    const dispatch = useDispatch()

    const formError = useActionData()

    const cart = useSelector(getCart)

    const totalCartPrice = useSelector(getTotalCartPrice)

    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0

    const finalPrice = totalCartPrice + priorityPrice

    if (!cart.length) return <EmptyCart />

    return (
        <div className="px-4 py-8">
            <h2 className="fonr-semibold mb-8 text-xl">
                Ready to order? Let's go!
            </h2>

            {/* <Form method="POST" action="/order/new"> */}
            <Form method="POST">
                <div className="space-y-5 sm:space-y-8">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <label className="sm:basis-40">First Name</label>

                        <input
                            type="text"
                            name="customer"
                            required
                            className="input grow"
                            defaultValue={username}
                        />
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <label className="sm:basis-40">Phone number</label>
                        <div className="grow">
                            <input
                                type="tel"
                                name="phone"
                                defaultValue={phone}
                                required
                                className="input w-full"
                            />

                            {formError?.phone && (
                                <p className="text-sx mt-2 rounded-md bg-red-100 px-4 py-2 text-red-700">
                                    {formError.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <label className="sm:basis-40">Address</label>

                        <div className="relative grow">
                            <input
                                type="text"
                                name="address"
                                required
                                disabled={isLoadingAddress}
                                defaultValue={address}
                                className="input w-full"
                            />

                            {addressStatus === 'error' && (
                                <p className="text-sx mt-2 rounded-md bg-red-100 px-4 py-2 text-red-700">
                                    {errorAddress}
                                </p>
                            )}
                            <span className="absolute right-0 top-0 z-10 sm:right-[6px] sm:top-[7px]">
                                {!position.latitude && !position.longitude && (
                                    <Button
                                        disabled={isLoadingAddress}
                                        type="small"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            dispatch(fetchAddress())
                                        }}
                                    >
                                        Get position
                                    </Button>
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <input
                            className="h-6 w-6 cursor-pointer accent-sky-400 focus:outline-none focus:ring focus:ring-sky-400 focus:ring-offset-2"
                            type="checkbox"
                            name="priority"
                            id="priority"
                            value={withPriority}
                            onChange={(e) => setWithPriority(e.target.checked)}
                        />
                        <label htmlFor="priority">
                            Want to yo give your order priority?
                        </label>
                    </div>
                </div>
                <div className="mt-12">
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />

                    <input type="hidden" value={phone} />

                    <input
                        type="hidden"
                        name="position"
                        value={
                            position.latitude && position.longitude
                                ? `${position.latitude}, ${position.longitude}`
                                : ''
                        }
                    />

                    <Button type="base">
                        {isSubmitting || isLoadingAddress
                            ? ' Placing order...'
                            : `Order now from ${formatCurrency(finalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const order = {
        ...data,

        cart: JSON.parse(data.cart),

        priority: data.priority === 'true',
    }

    const errors = {}

    if (!isValidPhone(order.phone))
        errors.phone =
            ' Please give us your correct phone number for contacting later'

    if (Object.keys(errors).length > 0) return errors

    const newOrder = await createOrder(order)

    store.dispatch(clearCart())

    return redirect(
        `/order/${newOrder.id}?address=${newOrder.address}&phoneNo=${newOrder.phone}`
    )
}

export default CreateOrder

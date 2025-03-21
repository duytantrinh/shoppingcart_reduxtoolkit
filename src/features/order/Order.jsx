// Test ID: IIDSAT

import { useFetcher, useLoaderData, useSearchParams } from 'react-router-dom'
import { getOrder } from '../../services/apiRestaurant'
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from '../../utils/helpers'
import OrderItem from './OrderItem'
import { useEffect } from 'react'
import UpdateOrder from './UpdateOrder'

function Order() {
    const order = useLoaderData()

    const fetcher = useFetcher()

    const [searchParams] = useSearchParams()
    const address = searchParams.get('address')
    const phone = searchParams.get('phoneNo')

    useEffect(
        function () {
            if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu')
        },
        [fetcher]
    )

    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
        customer,
    } = order

    const deliveryIn = calcMinutesLeft(estimatedDelivery)

    return (
        <div className="space-y-8 px-4 py-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">Order #{id} status</h2>

                <div className="space-x-2">
                    {priority && (
                        <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-100">
                            Priority
                        </span>
                    )}
                    <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-100">
                        {status} order
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-stone-200 px-6 py-5">
                <p className="font-medium">
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                        : 'Order should have arrived'}
                </p>
                <p className="text-sx text-stone-600">
                    (Estimated delivery: {formatDate(estimatedDelivery)})
                </p>
            </div>
            <ul className="divide-y divide-dashed divide-sky-300 rounded-lg bg-sky-100 px-6 py-5">
                {cart.map((item) => (
                    <OrderItem
                        item={item}
                        key={item.pizzaId}
                        isLoadingIngredients={fetcher.state === 'loading'}
                        ingredients={
                            fetcher?.data?.find(
                                (ele) => ele.id === item.pizzaId
                            ).ingredients ?? []
                        }
                    />
                ))}
            </ul>

            <div className="space-y-2 bg-stone-200 px-5 py-6">
                <p>Customer Name: {customer}</p>
                <p>Address: {address}</p>
                <p>Phone: {phone}</p>
                {/* <p>Phone: </p> */}
                <p className="text-sm font-medium text-stone-600">
                    Price pizza: {formatCurrency(orderPrice)}
                </p>
                {priority && (
                    <p className="text-sm font-medium text-stone-600">
                        Price priority: {formatCurrency(priorityPrice)}
                    </p>
                )}
                <p className="font-bold">
                    To pay on delivery:{' '}
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>
            </div>
            {!priority && <UpdateOrder order={order} />}
        </div>
    )
}

export async function loader({ params }) {
    const order = await getOrder(params.orderId)

    return order
}

export default Order

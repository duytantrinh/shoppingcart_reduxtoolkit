import { Outlet, useNavigation } from 'react-router-dom'
import CartOverview from '../features/cart/CartOverview'
import Header from './Header'
import Loader from './Loader'

function AppLayout() {
    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading'

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            {isLoading === true && <Loader />}
            <Header />
            <div className="main overflow-scroll bg-amber-100 p-2 sm:p-8">
                <main
                    className="mx-auto max-w-3xl rounded-[20px] bg-slate-50 bg-[length:20px_20px] p-2.5 shadow-[4px_3px_7px_2px_rgba(0,0,0,0.3)]"
                    style={{
                        backgroundImage:
                            'radial-gradient(#bfc0c1 7.2%, transparent 0)',
                    }}
                >
                    <Outlet />
                </main>
            </div>

            <CartOverview />
        </div>
    )
}

export default AppLayout

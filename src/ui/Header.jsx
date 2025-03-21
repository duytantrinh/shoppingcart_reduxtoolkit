import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

function Header() {
    return (
        <div className="flex items-center justify-between border-b border-slate-400 bg-gradient-to-r from-sky-500 to-sky-300 px-4 py-3 uppercase sm:px-6">
            <Link to="/" className="text-pizza tracking-widest">
                Fast React Pizza Co.
            </Link>

            <SearchOrder />
            <Username />
        </div>
    )
}

export default Header

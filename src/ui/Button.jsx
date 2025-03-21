import { Link } from 'react-router-dom'

function Button({ children, disabled, to, type, onClick, id }) {
    const base = `z-10 text-sm inline-block relative overflow-hidden rounded-full bg-sky-300 font-semibold uppercase tracking-wide 
        text-stone-700 shadow-[4px_3px_7px_2px_rgba(0,0,0,0.3)] transition-colors focus:outline-none active:shadow-none
        focus:ring focus:ring-sky-400 focus:ring-offset-2 active:bg-sky-500 disabled:cursor-not-allowed
        [&>span]:hover:text-white 
        before:content-[' '] before:rounded-full before:absolute before:left-0 before:top-0 before:bg-sky-500 before:text-white before:h-full before:w-full 
        before:origin-bottom-left before:rotate-[-90deg] before:transition-all hover:before:rotate-0 before:duration-300 `

    const secondary = `z-10 text-sm inline-block relative overflow-hidden rounded-full  bg-sky-100 font-semibold capitalize tracking-wide
        text-stone-500 shadow-[4px_3px_7px_2px_rgba(0,0,0,0.3)] transition-all duration-300 focus:outline-none px-2 py-[6px] sm:px-3 sm:py-2 
        focus:ring focus:ring-stone-400 focus:ring-offset-2 active:bg-stone-500 disabled:cursor-not-allowed 
        focus:shadow-none
        [&>span]:hover:text-white [&>span]:text-sm 
        before:content-[' '] before:rounded-full before:absolute before:left-0 before:top-0 before:bg-stone-300 before:text-white before:h-full before:w-full 
        before:origin-bottom-left before:rotate-[-90deg] before:transition-all hover:before:rotate-0 before:duration-300`

    const styles = {
        base: base + ' px-3 py-2 sm:px-6 sm:py-3',
        small: base + 'px-2 py-[6px] sm:px-3 sm:py-2 text-xs',
        round: base + 'px-1.5 py-[2px] sm:px-2 sm:py-1 text-xs',
        secondary,
    }

    if (to) {
        return (
            <Link to={to} className={styles[type]}>
                <span className="relative z-20"> {children}</span>
            </Link>
        )
    }

    if (onClick) {
        return (
            <button
                disabled={disabled}
                onClick={onClick}
                className={styles[type]}
            >
                <span className="relative z-20">{children}</span>
            </button>
        )
    }

    return (
        <button disabled={disabled} className={styles[type]}>
            <span className="relative z-20">{children}</span>
        </button>
    )
}

export default Button

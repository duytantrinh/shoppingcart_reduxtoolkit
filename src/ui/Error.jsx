import { useRouteError } from 'react-router-dom'

import LinkButton from './LinkButton'

function NotFound() {
    const error = useRouteError()

    return (
        <div className="mx-auto max-w-3xl rounded-[20px] bg-slate-50 bg-[length:20px_20px] p-2.5 shadow-[4px_3px_7px_2px_rgba(0,0,0,0.3)]">
            <h1>Something went wrong 😢</h1>
            <p>{error.data || error.message}</p>
            <LinkButton to="-1">&larr; Go back</LinkButton>
        </div>
    )
}

export default NotFound

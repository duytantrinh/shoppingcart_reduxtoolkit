import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'

function Menu() {
    // get data from fetching loader()
    const menu = useLoaderData()

    return (
        <ul className="spaca-y-4">
            {menu.map((pizza) => (
                <MenuItem pizza={pizza} key={pizza.id} />
            ))}
        </ul>
    )
}

export async function loader() {
    const menu = await getMenu()
    return menu
}

export default Menu

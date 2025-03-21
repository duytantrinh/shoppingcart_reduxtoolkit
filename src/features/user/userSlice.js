import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import getAddress from '../../services/apiGeocoding'

function getPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

export const fetchAddress = createAsyncThunk(
    'user/fetchAddress',
    async function () {
        const pos = await getPosition()

        // console.log(pos)
        const position = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
        }
        // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
        const addressObj = await getAddress(position)
        const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`

        // // 3) Then we return an object with the data that we are interested in

        return { position, address }
    }
)

const initialState = {
    username: '',
    status: 'idle',
    position: '',
    address: '',
    phone: '',
    error: '',
}

const userSlice = createSlice({
    name: 'user', // store.user
    initialState,
    reducers: {
        updateName(state, action) {
            state.username = action.payload
        },
        updatePhone(state, action) {
            state.phone = action.payload
        },
        updateAddress(state, action) {
            state.address = action.payload
        },
    },

    extraReducers: (builder) =>
        builder

            .addCase(fetchAddress.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.position = action.payload.position
                state.address = action.payload.address
                state.status = 'idle'
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.status = 'error'
                // state.error = action.error.message
                state.error =
                    'There was something problem while getting your location. Please fill this field instead. Thanks'
            }),
})

export const { updateName, updatePhone, updateAddress } = userSlice.actions
export default userSlice.reducer

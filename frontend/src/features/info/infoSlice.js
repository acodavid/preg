import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import infoService from './infoService'

const initialState = {
    infoPreg: null,
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ''
}

// create new info amn
export const createInfo = createAsyncThunk('family/create', async (infoData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await infoService.createInfo(infoData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createInfo.fulfilled, (state) => {
                state.isLoading = false
                state.isSucces = true
            })
            .addCase(createInfo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = infoSlice.actions
export default infoSlice.reducer
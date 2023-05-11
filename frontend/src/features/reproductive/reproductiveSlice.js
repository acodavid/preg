import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reproductiveService from './reproductiveService'

const initialState = {
    reproductiveAmn: null,
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ''
}

// create new reproductive amn
export const createReproductive = createAsyncThunk('reproductive/create', async (reproAmn, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reproductiveService.createReproductive(reproAmn, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const reproductiveSlice = createSlice({
    name: 'reproductive',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReproductive.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createReproductive.fulfilled, (state) => {
                state.isLoading = false
                state.isSucces = true
            })
            .addCase(createReproductive.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = reproductiveSlice.actions
export default reproductiveSlice.reducer
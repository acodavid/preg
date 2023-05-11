import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import personalService from './personalService'

const initialState = {
    personalAmn: null,
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ''
}

// create new personal amn
export const createPersonal = createAsyncThunk('personal/create', async (personalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await personalService.createPersonal(personalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const personSlice = createSlice({
    name: 'personal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPersonal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPersonal.fulfilled, (state) => {
                state.isLoading = false
                state.isSucces = true
            })
            .addCase(createPersonal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = personSlice.actions
export default personSlice.reducer
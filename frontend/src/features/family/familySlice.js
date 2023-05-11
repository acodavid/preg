import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import familyService from './familyService'

const initialState = {
    familyAmn: null,
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ''
}

// create new family amn
export const createFamily = createAsyncThunk('family/create', async (familyData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await familyService.createFamily(familyData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const familySlice = createSlice({
    name: 'family',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFamily.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createFamily.fulfilled, (state) => {
                state.isLoading = false
                state.isSucces = true
            })
            .addCase(createFamily.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = familySlice.actions
export default familySlice.reducer
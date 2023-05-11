import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notesService from './notesService'

const initialState = {
    notes: null,
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ''
}

// create new family amn
export const createNotes = createAsyncThunk('notes/create', async (notes, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notesService.createNotes(notes, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNotes.fulfilled, (state) => {
                state.isLoading = false
                state.isSucces = true
            })
            .addCase(createNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = notesSlice.actions
export default notesSlice.reducer
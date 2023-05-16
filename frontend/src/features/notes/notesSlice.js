import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notesService from './notesService'

const initialState = {
    notesAmn: null,
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

// Get personal data for user
export const getNotesData = createAsyncThunk('notes/getNotesDataForUser', async (user_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notesService.getNotesDataForUser(user_id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// remove personal data from global state
export const removeNotesDataFromState = createAsyncThunk('notes/removeData', async (_, thunkAPI) => {
    console.log('Removing data from global state')
})

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSucces = false
            state.message = ''
        }
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
            .addCase(getNotesData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotesData.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucces = true
                state.notesAmn = action.payload
            })
            .addCase(getNotesData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeNotesDataFromState.fulfilled, (state) => {
                state.notesAmn = null
                
            })
    }
})

export const {reset} = notesSlice.actions
export default notesSlice.reducer
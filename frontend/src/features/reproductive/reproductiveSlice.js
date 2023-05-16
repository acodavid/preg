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

// Get personal data for user
export const getReproductiveData = createAsyncThunk('reproductive/getReproductiveDataForUser', async (user_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reproductiveService.getReproductiveDataForUser(user_id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// remove personal data from global state
export const removeReproductiveDataFromState = createAsyncThunk('reproductive/removeData', async (_, thunkAPI) => {
    console.log('Removing data from global state')
})

export const reproductiveSlice = createSlice({
    name: 'reproductive',
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
            .addCase(getReproductiveData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getReproductiveData.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucces = true
                state.reproductiveAmn = action.payload
            })
            .addCase(getReproductiveData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeReproductiveDataFromState.fulfilled, (state) => {
                state.reproductiveAmn = null
                
            })
    }
})

export const {reset} = reproductiveSlice.actions
export default reproductiveSlice.reducer
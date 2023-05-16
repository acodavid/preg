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

// Get personal data for user
export const getPersonalData = createAsyncThunk('personal/getPersonalDataForUser', async (user_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await personalService.getPersonalDateForUser(user_id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// remove personal data from global state
export const removeDataFromState = createAsyncThunk('personal/removeData', async (_, thunkAPI) => {
    console.log('Removing data from global state')
})

export const personSlice = createSlice({
    name: 'personal',
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
            .addCase(getPersonalData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPersonalData.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucces = true
                state.personalAmn = action.payload
            })
            .addCase(getPersonalData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeDataFromState.fulfilled, (state) => {
                state.personalAmn = null
                
            })
    }
})

export const {reset} = personSlice.actions
export default personSlice.reducer
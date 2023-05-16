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
export const createInfo = createAsyncThunk('info/create', async (infoData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await infoService.createInfo(infoData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Get info data for user
export const getInfoData = createAsyncThunk('info/getInfoDataForUser', async (user_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await infoService.getInfoDataForUser(user_id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// remove info data from global state
export const removeInfoDataFromState = createAsyncThunk('info/removeData', async (_, thunkAPI) => {
    console.log('Removing info data from global state')
})

export const infoSlice = createSlice({
    name: 'info',
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
            .addCase(getInfoData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getInfoData.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucces = true
                state.infoPreg = action.payload
            })
            .addCase(getInfoData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeInfoDataFromState.fulfilled, (state) => {
                state.infoPreg = null
                
            })
    }
})

export const {reset} = infoSlice.actions
export default infoSlice.reducer
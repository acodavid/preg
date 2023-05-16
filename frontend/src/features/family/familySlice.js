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

// Get personal data for user
export const getFamilyData = createAsyncThunk('family/getFamilyDataForUser', async (user_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await familyService.getFamilyDataForUser(user_id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// remove personal data from global state
export const removeFamilyDataFromState = createAsyncThunk('family/removeData', async (_, thunkAPI) => {
    console.log('Removing family data from global state')
})

export const familySlice = createSlice({
    name: 'family',
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
            .addCase(getFamilyData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFamilyData.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucces = true
                state.familyAmn = action.payload
            })
            .addCase(getFamilyData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeFamilyDataFromState.fulfilled, (state) => {
                state.familyAmn = null
                
            })
    }
})

export const {reset} = familySlice.actions
export default familySlice.reducer
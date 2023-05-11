import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import personSlice from '../features/personal/personSlice';
import familySlice from '../features/family/familySlice';
import reproductiveSlice from '../features/reproductive/reproductiveSlice'
import notesSlice from '../features/notes/notesSlice';
import infoSlice from '../features/info/infoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    personal: personSlice,
    family: familySlice,
    reproductive: reproductiveSlice,
    notes: notesSlice,
    info: infoSlice
  },
});

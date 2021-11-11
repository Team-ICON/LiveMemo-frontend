import { configureStore } from '@reduxjs/toolkit';
import memoReducer from '../features/memoSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    memo: memoReducer,
    user: userReducer,
  },
});

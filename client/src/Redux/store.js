import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Redux/userslice'; // Adjust the path based on your project structure

export const store = configureStore({
  reducer: {
    user: userReducer, // Use the user slice reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
